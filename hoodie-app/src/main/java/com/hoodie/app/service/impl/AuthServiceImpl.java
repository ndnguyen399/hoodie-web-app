/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
import com.hoodie.app.entity.RefreshToken;
import com.hoodie.app.entity.User;
import com.hoodie.app.exception.BusinessValidationException;
import com.hoodie.app.exception.UnauthorizedException;
import com.hoodie.app.repository.RefreshTokenRepository;
import com.hoodie.app.repository.UserRepository;
import com.hoodie.app.service.AuthService;
import com.hoodie.app.util.JwtUtil;
import com.hoodie.app.util.TokenHashUtil;

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

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private TokenHashUtil tokenHashUtil;

    /**
     * registerUserByRequest
     * 
     * @param request
     * @return RegisterResponse
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
                .role(Role.ROLE_CUSTOMER).birthDate(request.getBirthDate()).deleteFlag(Constant.DELETE_FLAG_ZERO)
                .build();
        userRepository.save(user);

        RegisterResponse response = new RegisterResponse();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);

        return response;
    }

    /**
     * loginUser
     * 
     * @param request
     * @return AuthResponse
     */
    @Override
    public AuthResponse loginUser(AuthRequest request) {
        // check validate
        List<ValidationErrorItem> errors = this.checkValidate(request);
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String accessToken = jwtUtil.generateAccessToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        User user = userRepository.findByEmailAndDeleteFlag(request.getEmail(), Constant.DELETE_FLAG_ZERO);

        saveRefreshToken(user.getUserId(), refreshToken);

        AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
        return authResponse;
    }

    /**
     * refreshToken
     * 
     * @param refreshToken
     * @return AuthResponse
     */
    @Override
    public AuthResponse refreshToken(String refreshToken) {
        // check token type
        if (!jwtUtil.isRefreshToken(refreshToken)) {
            throw new UnauthorizedException(
                    List.of(new ValidationErrorItem(Constant.E_HOODIE_001, Constant.TOKEN_INVALID_MESSAGE)));
        }
        String email = jwtUtil.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        // validate jwt
        if (!jwtUtil.isTokenValid(refreshToken, userDetails)) {
            throw new UnauthorizedException(
                    List.of(new ValidationErrorItem(Constant.E_HOODIE_001, Constant.TOKEN_INVALID_MESSAGE)));
        }

        // find db
        String tokenHash = tokenHashUtil.sha256(refreshToken);
        RefreshToken tokenEntity = refreshTokenRepository
                .findByTokenHashAndDeleteFlag(tokenHash, Constant.DELETE_FLAG_ZERO)
                .orElseThrow(() -> new UnauthorizedException(
                        List.of(new ValidationErrorItem(Constant.E_HOODIE_003, Constant.TOKEN_INVALID_MESSAGE))));

        // revoked?
        if (tokenEntity.getRevokedAt() != null) {
            throw new UnauthorizedException(
                    List.of(new ValidationErrorItem(Constant.E_HOODIE_004, Constant.TOKEN_REVOKED_MESSAGE)));
        }

        // rotate token
        tokenEntity.setRevokedAt(OffsetDateTime.now());
        refreshTokenRepository.save(tokenEntity);

        // generate new tokens
        String newAccessToken = jwtUtil.generateAccessToken(userDetails);
        String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);
        saveRefreshToken(tokenEntity.getUserId(), newRefreshToken);

        return new AuthResponse(newAccessToken, newRefreshToken);
    }

    /**
     * checkValidate
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidate(AuthRequest request) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        User user = userRepository.findByEmailAndDeleteFlag(request.getEmail(), Constant.DELETE_FLAG_ZERO);
        if (user == null) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.INVALID_CREDENTIALS_MESSAGE));
        }
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }
        boolean isMatch = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
        if (!isMatch) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.INVALID_CREDENTIALS_MESSAGE));
        }
        return errors;
    }

    /**
     * saveRefreshToken
     * 
     * @param user
     * @param refreshToken
     */
    private void saveRefreshToken(Long userId, String refreshToken) {
        RefreshToken entity = new RefreshToken();
        entity.setUserId(userId);
        entity.setTokenHash(tokenHashUtil.sha256(refreshToken));
        entity.setExpiresAt(jwtUtil.extractExpiration(refreshToken).toInstant().atOffset(ZoneOffset.UTC));
        entity.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        refreshTokenRepository.save(entity);
    }
}
