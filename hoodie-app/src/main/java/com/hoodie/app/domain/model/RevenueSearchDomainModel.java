/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * RevenueSearchDomainModel
 */
@Getter
@Setter
public class RevenueSearchDomainModel {
    private RevenueSummary summary;

    private List<RevenueByDate> revenueByDate;

    private List<RevenueByCategory> revenueByCategory;

    private List<RevenueByProduct> topProducts;
}
