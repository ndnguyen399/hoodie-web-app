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
import com.hoodie.app.service.AuthService;

/**
 * AuthController class
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
//            if (userRepository.existsByUsername(request.getUsername())) {
//                return ResponseEntity.badRequest().body("Username already exists");
//            }
//            if (userRepository.existsByEmail(request.email())) {
//                return ResponseEntity.badRequest().body("Email already exists");
//            }
            authService.registerUserByRequest(request);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse authResponse = authService.loginUser(request);
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String refreshToken) {
        // Implement logic refresh token nếu cần (kiểm tra, tạo access mới)
        // Hiện tại để đơn giản, bạn có thể mở rộng sau
        return ResponseEntity.ok().build();
    }
}
