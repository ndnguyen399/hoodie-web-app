/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * OrderSearchDomainModel class
 */
@Setter
@Getter
public class OrderSearchDomainModel {
    private Integer orderId;
    private BigDecimal subtotal;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;
    private String orderStatus;
    private String note;
    private String promotionCode;
    private OffsetDateTime createdAt;
    private UserAddressSearchDomainModel address;
    private PaymentSearchDomainModel payment;
    private List<OrderItemSearchDomainModel> items;
}
