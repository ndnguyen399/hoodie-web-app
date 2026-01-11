/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto.response.error;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * FieldErrorDto class
 */
@Data
@AllArgsConstructor
public class FieldErrorDto {
    private String field;
    private String message;
}
