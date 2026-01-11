/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto.response.error;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * ErrorDetailDto class
 */
@Data
@Builder
public class ErrorDetailDto {
    private String code;
    private List<FieldErrorDto> errors;
}
