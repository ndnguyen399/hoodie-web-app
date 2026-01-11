/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

/**
 * ProductSearchDomainModel class
 */
@Data
@AllArgsConstructor
public class ProductSearchDomainModel {
    /**
     * product Id
     */
    private Long productId;

    /**
     * product Name
     */
    private String productName;

    /**
     * category Name
     */
    private String categoryName;

    /**
     * display Price
     */
    private BigDecimal displayPrice;

//    /**
//     * total Stock
//     */
//    private Integer totalStock;

    /**
     * primary Image Url
     */
    private String primaryImageUrl;
}
