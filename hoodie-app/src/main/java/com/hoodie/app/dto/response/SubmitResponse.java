/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto.response;

import java.util.List;

import lombok.Data;

/**
 * SubmitResponse class
 */
@Data
public class SubmitResponse<T> {
    private boolean error;
    private String message;
    private List<T> data;

    public SubmitResponse(boolean error, String message, List<T> data) {
        this.error = error;
        this.message = message;
        this.data = data;
    }
}
