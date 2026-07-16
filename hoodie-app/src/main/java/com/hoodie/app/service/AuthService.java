/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.dto.AuthRequest;
import com.hoodie.app.dto.AuthResponse;
import com.hoodie.app.dto.LogoutResponse;
import com.hoodie.app.dto.RegisterRequest;
import com.hoodie.app.dto.RegisterResponse;
import com.hoodie.app.entity.User;

/**
 * AuthService class
 */
public interface AuthService {
    /**
     * registerUserByRequest
     * 
     * @param request
     * @return RegisterResponse
     */
    public RegisterResponse registerUserByRequest(RegisterRequest request);

    /**
     * loginUser
     * 
     * @param request
     * @return AuthResponse
     */
    public AuthResponse loginUser(AuthRequest request);

    /**
     * refreshToken
     * 
     * @param refreshToken
     * @return
     */
    public AuthResponse refreshToken(String refreshToken);

    /**
     * logout
     * 
     * @param user
     * @param refreshToken
     */
    public LogoutResponse logout(User user, String refreshToken);
}
