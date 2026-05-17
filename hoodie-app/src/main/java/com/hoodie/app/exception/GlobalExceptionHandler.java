/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.BaseApiResponseFactory;
import com.hoodie.app.dto.response.error.ErrorDetailDto;
import com.hoodie.app.dto.response.error.FieldErrorDto;

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
     * Nếu bạn muốn HTTP Status khớp với error
     */
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<BaseApiResponse<ErrorDetailDto>> handleValidationException(...) {
//        return ResponseEntity
//            .status(HttpStatus.BAD_REQUEST)
//            .body(response);
//    }

    /**
     * IllegalArgument / Business Error – 400
     * 
     * @param ex
     * @return BaseApiResponse<ErrorDetailDto>
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public BaseApiResponse<ErrorDetailDto> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorDetailDto detail = ErrorDetailDto.builder().code("BAD_REQUEST").build();

        return BaseApiResponseFactory.badRequest(ex.getMessage(), detail);
    }

    /**
     * Runtime Exception – 500
     * 
     * @param ex
     * @return aseApiResponse<ErrorDetailDto>
     * @throws Exception 
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) 
    public BaseApiResponse<ErrorDetailDto> handleException(Exception ex) throws Exception {

        log.error("Unexpected error", ex); // production logging

        //return BaseApiResponseFactory.internalError("Internal server error");
        throw ex;
    }
}
