/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * AuthResponse class
 */
@Data
@AllArgsConstructor
public class AuthResponse {
    String accessToken;
    String refreshToken;
}
