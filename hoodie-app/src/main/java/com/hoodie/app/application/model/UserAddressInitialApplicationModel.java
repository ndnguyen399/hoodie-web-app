/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import lombok.Getter;
import lombok.Setter;

/**
 * UserAddressInitialApplicationModel class
 */
@Getter
@Setter
public class UserAddressInitialApplicationModel {
    private String recipientName;
    private String phone;
    private String street;
    private String ward;
    private String district;
    private String city;
}
