/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.dto.AuthRequest;
import com.hoodie.app.dto.AuthResponse;
import com.hoodie.app.dto.RegisterRequest;
import com.hoodie.app.dto.RegisterResponse;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.service.AuthService;

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
    public BaseApiResponse<RegisterResponse> register(@RequestBody @Valid RegisterRequest request) {
        RegisterResponse response = authService.registerUserByRequest(request);
        return BaseApiResponse.success(response);
    }

    /**
     * login
     * 
     * @param request
     * @return BaseApiResponse<AuthResponse
     */
    @PostMapping("/login")
    public BaseApiResponse<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
        AuthResponse authResponse = authService.loginUser(request);
        return BaseApiResponse.success(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String refreshToken) {
        // Implement logic refresh token nếu cần (kiểm tra, tạo access mới)
        // Hiện tại để đơn giản, bạn có thể mở rộng sau
        return ResponseEntity.ok().build();
    }
}
