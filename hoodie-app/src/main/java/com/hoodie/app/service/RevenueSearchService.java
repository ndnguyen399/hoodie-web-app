/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.RevenueSearchApplicationModel;
import com.hoodie.app.domain.model.RevenueSearchDomainModel;

/**
 * RevenueSearchService class
 */
public interface RevenueSearchService {
    public RevenueSearchDomainModel search(RevenueSearchApplicationModel request);
}
