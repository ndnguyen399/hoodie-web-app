/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ProductImageSearchDomainModel class
 */
@Data
@AllArgsConstructor
public class ProductImageSearchDomainModel {
    /**
     * image id
     */
    private Integer imageId;

    /**
     * product id
     */
    private Integer productId;

    /**
     * publicId
     */
    private String publicId;

    /**
     * image url
     */
    private String imageUrl;

    /**
     * alt text
     */
    private String altText;

    /**
     * display order
     */
    private Integer displayOrder;

    /**
     * is primary
     */
    private Boolean isPrimary;

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
