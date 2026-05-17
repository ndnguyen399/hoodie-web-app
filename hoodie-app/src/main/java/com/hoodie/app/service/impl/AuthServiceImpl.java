/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.hoodie.app.constant.Constant;
import com.hoodie.app.constant.Role;
import com.hoodie.app.dto.AuthRequest;
import com.hoodie.app.dto.AuthResponse;
import com.hoodie.app.dto.RegisterRequest;
import com.hoodie.app.dto.RegisterResponse;
import com.hoodie.app.dto.response.error.ValidationErrorItem;
import com.hoodie.app.entity.User;
import com.hoodie.app.exception.BusinessValidationException;
import com.hoodie.app.repository.UserRepository;
import com.hoodie.app.service.AuthService;
import com.hoodie.app.util.JwtUtil;

/**
 * AuthServiceImpl class
 */
@Component
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * registerUserByRequest
     * 
     * @param request
     * @return void
     */
    @Override
    public RegisterResponse registerUserByRequest(RegisterRequest request) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        if (userRepository.existsByEmail(request.getEmail())) {
            errors.add(new ValidationErrorItem(Constant.EXISTS_BY_EMAIL_CODE, Constant.EXISTS_BY_EMAIL_MESSAGE));
        }
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

        User user = User.builder().fullName(request.getFullName()).email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword())).phone(request.getPhone())
                .role(Role.CUSTOMER).deleteFlag(Constant.DELETE_FLAG_ZERO).build();
        userRepository.save(user);

        RegisterResponse response = new RegisterResponse();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);

        return response;
    }

    /**
     * registerUserByRequest
     * 
     * @param request
     * @return void
     */
    @Override
    public AuthResponse loginUser(AuthRequest request) {
        // check validate
//        List<ValidationErrorItem> errors = new ArrayList<>();

//        User user = userRepository.findByEmailAndDeleteFlag(request.getEmail(), Constant.DELETE_FLAG_ZERO);
//        if (user == null) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.ACCOUNT_NOT_FOUND_MESSAGE));
//        }
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }
//        boolean isMatch = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
//        if (!isMatch) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.INVALID_CREDENTIALS_MESSAGE));
//        }
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }
//        authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//        final String accessToken = jwtUtil.generateAccessToken(userDetails);
//        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);
//
//        AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
//        return authResponse;

        userRepository.findByEmailAndDeleteFlag(request.getEmail(), Constant.DELETE_FLAG_ZERO)
                .orElseThrow(() -> new BusinessValidationException(
                        List.of(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.ACCOUNT_NOT_FOUND_MESSAGE))));
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            // Bước 3: Lấy UserDetails từ Authentication (không cần gọi lại DB)
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Bước 4: Generate tokens
            String accessToken = jwtUtil.generateAccessToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails);

            return new AuthResponse(accessToken, refreshToken);

        } catch (BusinessValidationException e) {
            throw new BusinessValidationException(
                    List.of(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.INVALID_CREDENTIALS_MESSAGE)));
        }
    }

}
