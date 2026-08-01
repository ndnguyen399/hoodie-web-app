/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueSearchApplicationModel
 */
@Getter
@Setter
public class RevenueSearchApplicationModel {
    /**
     * today 7days 30days 90days month quarter year custom
     */
    private String range;

    /**
     * chỉ dùng khi range = custom
     */
    private LocalDate fromDate;

    private LocalDate toDate;
}
