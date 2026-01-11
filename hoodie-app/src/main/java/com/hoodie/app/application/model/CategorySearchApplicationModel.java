/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.application.model;

import lombok.Data;

/**
 * CategorySearchApplicationModel class
 */
@Data
public class CategorySearchApplicationModel {
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
}
