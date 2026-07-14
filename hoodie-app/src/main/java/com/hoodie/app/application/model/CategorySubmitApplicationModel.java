/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import com.hoodie.app.constant.Constant;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * CategorySubmitApplicationModel class
 */
@Getter
@Setter
public class CategorySubmitApplicationModel {
    /**
     * category id
     */
    private Integer categoryId;

    /**
     * category Name
     */
    @NotBlank(message = Constant.CATEGORY_NAME_NOT_NULL_MESSAGE)
    private String categoryName;

//    /**
//     * skill type
//     */
//    @NotBlank(message = Constant.CATEGORY_SKILL_TYPE_NOT_NULL_MESSAGE)
//    private String skillType;
//
//    /**
//     * age group
//     */
//    @NotBlank(message = Constant.CATEGORY_AGE_GROUP_NULL_MESSAGE)
//    private String ageGroup;

    /**
     * category description
     */
    private String categoryDescription;

    /**
     * reserveItem01
     */
    private String reserveItem01;

    /**
     * reserveItem02
     */
    private String reserveItem02;

    /**
     * reserveItem03
     */
    private String reserveItem03;

    /**
     * reserveItem04
     */
    private String reserveItem04;

    /**
     * reserveItem05
     */
    private String reserveItem05;
}
