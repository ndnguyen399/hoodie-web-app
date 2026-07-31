/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * UserSearchDomainModel
 */
@Setter
@Getter
public class UserSearchDomainModel {
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Date birthDate;
    private String gender;
    private String note;

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
