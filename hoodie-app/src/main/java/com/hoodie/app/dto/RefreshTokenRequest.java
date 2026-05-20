/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import com.hoodie.app.constant.Constant;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * RefreshTokenRequest class
 */
@Getter
@Setter
public class RefreshTokenRequest {
    @NotBlank(message = Constant.TOKEN_NOT_NULL_MESSAGE)
    private String refreshToken;
}
