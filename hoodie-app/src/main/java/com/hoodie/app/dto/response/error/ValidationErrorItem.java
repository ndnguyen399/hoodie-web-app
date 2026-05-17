/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto.response.error;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ValidationErrorItem
 */
@Data
@AllArgsConstructor
public class ValidationErrorItem {
    private String code;
    private String message;
}
