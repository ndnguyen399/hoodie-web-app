/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * CategorySearchDomainModel class
 */
@Getter
@Setter
@AllArgsConstructor
public class CategorySearchDomainModel {
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
//     * skill type name
//     */
//    private String skillTypeName;
//
//    /**
//     * age group
//     */
//    private String ageGroup;
//    
//    /**
//     * age group name
//     */
//    private String ageGroupName;

    /**
     * category Description
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
