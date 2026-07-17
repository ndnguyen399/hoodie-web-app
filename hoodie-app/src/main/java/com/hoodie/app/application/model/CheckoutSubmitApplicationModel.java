/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * CheckoutSubmitApplicationModel class
 */
@Getter
@Setter
public class CheckoutSubmitApplicationModel {
    /**
     * listId
     */
    private List<Integer> listId;
    /**
     * note
     */
    private String note;
    /**
     * payment method
     */
    private String paymentMethod;
    private Integer orderId;
}
