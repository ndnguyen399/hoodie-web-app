/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.exception;

import java.util.List;

import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.response.error.ValidationErrorItem;

import lombok.Getter;

/**
 * BusinessValidationException class
 */
@Getter
public class BusinessValidationException extends RuntimeException {
    private final List<ValidationErrorItem> errors;

    public BusinessValidationException(List<ValidationErrorItem> errors) {
        super(Constant.BUSINESS_VALIDATE_FAILED);
        this.errors = errors;
    }
}
