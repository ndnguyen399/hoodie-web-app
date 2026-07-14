/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import lombok.Getter;
import lombok.Setter;

/**
 * CategorySubmitDeleteApplicationModel class
 */
@Getter
@Setter
public class CategorySubmitDeleteApplicationModel {
    /**
     * category id
     */
//    @NotBlank(message = Constant.CATEGORY_ID_NOT_NULL_MESSAGE)
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
