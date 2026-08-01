/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueByDate
 */
@Getter
@Setter
public class RevenueByDate {
    private LocalDate date;

    private BigDecimal revenue;

    private Integer orders;
}
