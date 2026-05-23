/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * CodeSearchDomainModel class
 */
@Getter
@Setter
@AllArgsConstructor
public class CodeSearchDomainModel {
    /**
     * codeId
     */
    private Integer codeId;
    /**
     * codeCd
     */
    private String codeCd;
    /**
     * codeName
     */
    private String codeName;
    /**
     * codeValue
     */
    private String codeValue;
    /**
     * codeDescription
     */
    private String codeDescription;
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
