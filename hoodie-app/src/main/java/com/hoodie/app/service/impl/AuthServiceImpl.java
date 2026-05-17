/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

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
import com.hoodie.app.entity.User;
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
    public void registerUserByRequest(RegisterRequest request) {
        try {
            User user = 
                    User.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .phone(request.getPhone())
                    .role(Role.CUSTOMER)
                    .deleteFlag(Constant.DELETE_FLAG_ZERO)
                    .build();
            userRepository.save(user);
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }

    }

    /**
     * registerUserByRequest
     * 
     * @param request
     * @return void
     */
    @Override
    public AuthResponse loginUser(AuthRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String accessToken = jwtUtil.generateAccessToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
        return authResponse;
    }

}
