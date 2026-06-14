/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import com.hoodie.app.constant.Constant;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * SubmitModel class
 */
@Getter
@Setter
public class SubmitRequestModel<T> {
    @NotBlank(message = Constant.REQUEST_TYPE_NOT_BLANK)
    private String requestType;
    @Valid
    private T model;
}
