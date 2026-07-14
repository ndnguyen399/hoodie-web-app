/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import lombok.Getter;
import lombok.Setter;

/**
 * CategoryInitialApplicationModel class
 */
@Getter
@Setter
public class CategoryInitialApplicationModel {
    /**
     * category id
     */
    private Integer categoryId;

    /**
     * category Name
     */
    private String categoryName;

//    /**
//     * skill type
//     */
//    private String skillType;
//
//    /**
//     * age group
//     */
//    private String ageGroup;

    /**
     * category description
     */
    private String categoryDescription;
}
