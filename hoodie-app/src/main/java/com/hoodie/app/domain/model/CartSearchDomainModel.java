/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * CartSearchDomainModel class
 */
@Getter
@Setter
public class CartSearchDomainModel {
    private Integer cartItemId;

    private Integer productId;

    private String productName;

    private String productDescription;

    private BigDecimal price;

    private Integer stockQuantity;

    private String imageUrl;

    private Integer quantity;
}
