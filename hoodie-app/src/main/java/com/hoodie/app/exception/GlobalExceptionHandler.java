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
import com.hoodie.app.dto.response.BaseApiResponseFactory;
import com.hoodie.app.dto.response.error.ErrorDetailDto;
import com.hoodie.app.dto.response.error.FieldErrorDto;
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
    public BaseApiResponse<ErrorDetailDto> handleValidationException(MethodArgumentNotValidException ex) {
        List<FieldErrorDto> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> new FieldErrorDto(err.getField(), err.getDefaultMessage())).toList();

        ErrorDetailDto detail = ErrorDetailDto.builder().code("BAD_REQUEST").errors(errors).build();

        return BaseApiResponseFactory.badRequest("Validation failed", detail);
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
}
