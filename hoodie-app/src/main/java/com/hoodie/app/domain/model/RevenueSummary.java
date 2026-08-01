/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueSummary
 */
@Getter
@Setter
public class RevenueSummary {
    /**
     * Tổng doanh thu
     */
    private BigDecimal totalRevenue;

    /**
     * Tổng đơn hàng
     */
    private Integer totalOrders;

    /**
     * Giá trị TB / đơn
     */
    private BigDecimal averageOrderValue;

    /**
     * %
     */
    private BigDecimal growthRate;

    /**
     * Doanh thu kỳ trước
     */
    private BigDecimal previousRevenue;

    /**
     * Chênh lệch doanh thu
     */
    private BigDecimal revenueDifference;
}
