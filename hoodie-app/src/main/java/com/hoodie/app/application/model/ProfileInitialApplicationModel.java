/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * ProfileInitialApplicationModel class
 */
@Getter
@Setter
public class ProfileInitialApplicationModel {
//    /**
//     * changeImageFlag
//     */
//    private String changeImageFlag;
    /**
     * fullName
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
     * birthDate
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
}
