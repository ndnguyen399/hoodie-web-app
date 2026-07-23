/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProfileDomainModel class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDomainModel {
    /**
     * full_name
     */
    private String fullName;

    /**
     * email
     */
    private String email;

    /**
     * phone
     */
    private String phone;

    /**
     * avatarUrl
     */
    private String avatarUrl;

    /**
     * birth_date
     */
    private Date birthDate;

    /**
     * gender
     */
    private String gender;

    /**
     * note
     */
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
