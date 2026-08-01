/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import java.time.LocalDate;
import java.util.List;

import com.hoodie.app.domain.model.RevenueByCategory;
import com.hoodie.app.domain.model.RevenueByDate;
import com.hoodie.app.domain.model.RevenueByProduct;
import com.hoodie.app.domain.model.RevenueSummary;

/**
 * RevenueRepositoryCustom class
 */
public interface RevenueRepositoryCustom {
    RevenueSummary getSummary(LocalDate fromDate, LocalDate toDate, String range);

    List<RevenueByDate> getRevenueByDate(LocalDate fromDate, LocalDate toDate);

    List<RevenueByCategory> getRevenueByCategory(LocalDate fromDate, LocalDate toDate);

    List<RevenueByProduct> getTopProducts(LocalDate fromDate, LocalDate toDate);
}
