/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * CategorySearchDomainModel class
 */
@Data
@AllArgsConstructor
public class CategorySearchDomainModel {
    /**
     * category id
     */
    private Integer categoryId;

    /**
     * category History No
     */
    private Integer categoryHistoryNo;

    /**
     * category Name
     */
    private String categoryName;

    /**
     * category Description
     */
    private String categoryDescription;

    /**
     * delete Flag
     */
    private String deleteFlag;

    /**
     * created At
     */
    private OffsetDateTime createdAt;

    /**
     * updated At
     */
    private OffsetDateTime updatedAt;
}
