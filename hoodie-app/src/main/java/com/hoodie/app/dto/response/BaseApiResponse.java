/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BaseApiResponse<T> class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseApiResponse<T> {
    private boolean error;
    private String message;
    private T data;

    public static <T> BaseApiResponse<T> success(T data) {
        return new BaseApiResponse<>(false, "no error", data);
    }

    public static <T> BaseApiResponse<T> fail(String message) {
        return new BaseApiResponse<>(true, message, null);
    }
}
