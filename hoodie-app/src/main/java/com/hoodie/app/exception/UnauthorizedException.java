/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.exception;

import java.util.List;

import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.response.error.ValidationErrorItem;

import lombok.Getter;

/**
 * UnauthorizedException class
 */
@Getter
public class UnauthorizedException extends RuntimeException {
    private final List<ValidationErrorItem> errors;

    public UnauthorizedException(List<ValidationErrorItem> errors) {
        super(Constant.BUSINESS_VALIDATE_FAILED);
        this.errors = errors;
    }
}
