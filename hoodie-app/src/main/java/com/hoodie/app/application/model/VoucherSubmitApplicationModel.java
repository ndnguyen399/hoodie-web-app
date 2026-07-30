/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * VoucherSubmitApplicationModel
 */
@Setter
@Getter
public class VoucherSubmitApplicationModel {
    private Integer promotionId;
    private String promotionCode;
    private String promotionName;
    private String description;
    private BigDecimal discountValue;
    private BigDecimal minOrderValue;
    private BigDecimal maxDiscountAmount;
    private Integer usageLimit;
    private Date startDate;
    private Date endDate;
}
