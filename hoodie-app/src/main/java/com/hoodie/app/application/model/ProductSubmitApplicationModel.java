/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.math.BigDecimal;

import com.hoodie.app.constant.Constant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * ProductSubmitApplicationModel class
 */
@Getter
@Setter
public class ProductSubmitApplicationModel {
    private Integer productId;
    @NotNull(message = Constant.CATEGORY_ID_NOT_NULL_MESSAGE)
    private Integer categoryId;
    @NotBlank(message = Constant.PRODUCT_NOT_NULL_MESSAGE)
    private String productName;
    private String productDescription;
    @NotNull(message = Constant.PRICE_NOT_NULL_MESSAGE)
    private BigDecimal price;
    @NotNull(message = Constant.STOCK_NOT_NULL_MESSAGE)
    private Integer stockQuantity;
    private String ageGroup;
    private String skillStemType;
    private String videoUrl;
    private String difficultyLevel;
    private String safetyCertifications;
//    @NotBlank(message = Constant.SKILL_LOGIC_NOT_NULL_MESSAGE)
//    private String skillLogic;
//    @NotBlank(message = Constant.SKILL_CREATIVE_NOT_NULL_MESSAGE)
//    private String skillCreative;
//    @NotBlank(message = Constant.SKILL_STEM_NOT_NULL_MESSAGE)
//    private String skillStem;
//    @NotBlank(message = Constant.SKILL_MOTOR_NOT_NULL_MESSAGE)
//    private String skillMotor;
//    @NotBlank(message = Constant.SKILL_SOCIAL_NOT_NULL_MESSAGE)
//    private String skillSocial;
    private String changeImageFlag;
}
