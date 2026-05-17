/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto;

import com.hoodie.app.constant.Constant;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthRequest class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {

    @NotBlank(message = Constant.EMAIL_NOT_BLANK)
    @Email(message = Constant.EMAIL_INVALID)
    private String email;

    @NotBlank(message = Constant.PASSWORD_NOT_BLANK)
    private String password;
}