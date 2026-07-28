/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

/**
 * UserAddressSearchDomainModel class
 */
@Getter
@Setter
public class UserAddressSearchDomainModel {
    private Integer addressId;

    private Long userId;

    private String recipientName;

    private String phone;

    private String street;

    private String ward;

    private String district;

    private String city;

    private Boolean isDefault;

    private String reserveItem01;

    private String reserveItem02;

    private String reserveItem03;

    private String reserveItem04;

    private String reserveItem05;

    private String deleteFlag;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;
}
