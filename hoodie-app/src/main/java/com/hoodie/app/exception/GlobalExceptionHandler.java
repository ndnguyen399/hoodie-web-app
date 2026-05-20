/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.error.ValidationErrorItem;

import lombok.extern.slf4j.Slf4j;

/**
 * GlobalExceptionHandler class
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    /**
     * Validation Error – 400
     * 
     * @param ex
     * @return BaseApiResponse<ErrorDetailDto>
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseApiResponse<List<ValidationErrorItem>>> handleValidationException(
            MethodArgumentNotValidException ex) {
        List<ValidationErrorItem> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> new ValidationErrorItem(err.getField(), err.getDefaultMessage())).toList();
        return ResponseEntity.badRequest().body(BaseApiResponse.failValidate(errors));
    }

    /**
     * handleBusinessValidation - 400
     * 
     * @param ex
     * @return error
     */
    @ExceptionHandler(BusinessValidationException.class)
    public ResponseEntity<BaseApiResponse<List<ValidationErrorItem>>> handleBusinessValidation(
            BusinessValidationException ex) {
        return ResponseEntity.badRequest().body(BaseApiResponse.failValidate(ex.getErrors()));
    }

    /**
     * handleInternalServerError - 500
     * 
     * @param ex
     * @return error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseApiResponse<Object>> handleInternalServerError(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BaseApiResponse.fail("Internal server error"));
    }

    /**
     * handleUnauthorized - 401
     * 
     * @param ex
     * @return error
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<BaseApiResponse<Object>> handleUnauthorized(UnauthorizedException ex) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(BaseApiResponse.failValidate(ex.getErrors()));
    }
}
