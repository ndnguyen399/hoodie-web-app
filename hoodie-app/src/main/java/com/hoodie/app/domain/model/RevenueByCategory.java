/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueByCategory
 */
@Getter
@Setter
public class RevenueByCategory {
    private String categoryName;

    private BigDecimal revenue;
}
