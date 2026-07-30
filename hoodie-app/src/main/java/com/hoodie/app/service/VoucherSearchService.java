/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.VoucherSearchApplicationModel;
import com.hoodie.app.domain.model.VoucherSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * VoucherSearchService
 */
public interface VoucherSearchService {
    public SearchResponse<VoucherSearchDomainModel> search(VoucherSearchApplicationModel request);
}
