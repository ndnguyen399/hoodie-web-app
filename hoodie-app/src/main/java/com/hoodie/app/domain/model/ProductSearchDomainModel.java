/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

/**
 * ProductSearchDomainModel class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSearchDomainModel {
    /**
     * product Id
     */
    private Integer productId;

    /**
     * category Id
     */
    private Integer categoryId;

    /**
     * category Name
     */
    private String categoryName;
    
    /**
     * product Name
     */
    private String productName;

    /**
     * product description
     */
    private String productDescription;

    /**
     * price
     */
    private BigDecimal price;

    /**
     * stock quantity
     */
    private Integer stockQuantity;

    /**
     * skill logic
     */
    private String skillLogic;

    /**
     * skill logic name
     */
    private String skillLogicName;

    /**
     * skill creative
     */
    private String skillCreative;

    /**
     * skill creative name
     */
    private String skillCreativeName;

    /**
     * skill stem
     */
    private String skillStem;

    /**
     * skill stem name
     */
    private String skillStemName;

    /**
     * skill motor
     */
    private String skillMotor;

    /**
     * skill motor name
     */
    private String skillMotorName;

    /**
     * skill social
     */
    private String skillSocial;

    /**
     * skill social name
     */
    private String skillSocialName;

    /**
     * List images
     */
    private List<ProductImageSearchDomainModel> listImages;

    /**
     * reserve item01
     */
    private String reserveItem01;

    /**
     * reserve item02
     */
    private String reserveItem02;

    /**
     * reserve item03
     */
    private String reserveItem03;

    /**
     * reserve item04
     */
    private String reserveItem04;

    /**
     * reserve item05
     */
    private String reserveItem05;

    /**
     * delete flag
     */
    private String deleteFlag;

    /**
     * created at
     */
    private OffsetDateTime createdAt;

    /**
     * updated at
     */
    private OffsetDateTime updatedAt;
}
