/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueByProduct
 */
@Getter
@Setter
public class RevenueByProduct {
    private String productName;
    private BigDecimal revenue;
    private Integer quantity;
}
