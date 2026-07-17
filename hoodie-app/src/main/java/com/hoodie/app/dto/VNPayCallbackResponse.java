/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * VNPayCallbackResponse class
 */
@Getter
@Builder
public class VNPayCallbackResponse {
    private boolean success;

    private String orderId;

    private String message;
}
