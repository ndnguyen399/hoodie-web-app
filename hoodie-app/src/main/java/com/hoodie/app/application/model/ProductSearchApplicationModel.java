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
     * content search
     */
    private String keyword;

    /**
     * category id
     */
    private Long categoryId;

    /**
     * color id
     */
    private Long colorId;

    /**
     * size id
     */
    private Long sizeId;

    /**
     * min price
     */
    private BigDecimal minPrice;

    /**
     * max price
     */
    private BigDecimal maxPrice;

    // private Integer page = 0;

    // private Integer size = 20;
}
