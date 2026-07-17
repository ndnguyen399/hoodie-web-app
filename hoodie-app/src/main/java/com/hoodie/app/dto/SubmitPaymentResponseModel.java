/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * SubmitPaymentResponseModel class
 */
@Getter
@Setter
public class SubmitPaymentResponseModel {
    private String code;
    private String message;
    private String paymentUrl;
    private Integer orderId;
    private String paymentStatus;
}
