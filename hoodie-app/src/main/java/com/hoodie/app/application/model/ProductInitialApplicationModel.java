/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * ProductInitialApplicationModel class
 */
@Getter
@Setter
public class ProductInitialApplicationModel {
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
