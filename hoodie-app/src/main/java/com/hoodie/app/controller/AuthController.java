/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.dto.AuthRequest;
import com.hoodie.app.dto.AuthResponse;
import com.hoodie.app.dto.RefreshTokenRequest;
import com.hoodie.app.dto.RegisterRequest;
import com.hoodie.app.dto.RegisterResponse;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.service.AuthService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * AuthController class
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * register
     * 
     * @param request
     * @return BaseApiResponse<RegisterResponse>
     */
    @PostMapping("/register")
    @Transactional
    public BaseApiResponse<List<RegisterResponse>> register(@RequestBody @Valid RegisterRequest request) {
        List<RegisterResponse> lists = new ArrayList<>();
        RegisterResponse response = authService.registerUserByRequest(request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }

    /**
     * login
     * 
     * @param request
     * @return BaseApiResponse<AuthResponse
     */
    @PostMapping("/login")
    @Transactional
    public BaseApiResponse<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
        AuthResponse authResponse = authService.loginUser(request);
        return BaseApiResponse.success(authResponse);
    }

    /**
     * refreshToken
     * 
     * @param refreshToken
     * @return
     */
    @PostMapping("/refresh-token")
    @Transactional
    public BaseApiResponse<AuthResponse> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return BaseApiResponse.success(response);
    }
}
