/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * OrderItemSearchDomainModel class
 */
@Setter
@Getter
public class OrderItemSearchDomainModel {
    private Integer productId;
    private String productName;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal totalPrice;
}
