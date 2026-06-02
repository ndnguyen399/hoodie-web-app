/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * SubmitModel class
 */
@Getter
@Setter
public class SubmitRequestModel<T> {
    private String requestType;
    private T model;
}
