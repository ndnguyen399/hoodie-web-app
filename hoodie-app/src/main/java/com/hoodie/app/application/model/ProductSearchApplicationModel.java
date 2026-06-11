/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.application.model;

import lombok.Data;
import java.math.BigDecimal;

/**
 * ProductSearchApplicationModel class
 */
@Data
public class ProductSearchApplicationModel {
    /**
     * product id
     */
    private Integer productId;

    /**
     * category id
     */
    private Integer categoryId;

    /**
     * product name
     */
    private String productName;

    /**
     * min price
     */
    private BigDecimal minPrice;

    /**
     * max price
     */
    private BigDecimal maxPrice;
}
