/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * LogoutRequest class
 */
@Getter
@Setter
public class LogoutRequest {
    private String refreshToken;
}
