/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.dto.AuthRequest;
import com.hoodie.app.dto.AuthResponse;
import com.hoodie.app.dto.RegisterRequest;

/**
 * AuthService class
 */
public interface AuthService {
    /**
     * registerUserByRequest
     * 
     * @param request
     * @return void
     */
    public void registerUserByRequest(RegisterRequest request);

    /**
     * loginUser
     * 
     * @param request
     * @return AuthResponse
     */
    public AuthResponse loginUser(AuthRequest request);
}
