/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * ProductSearchService class
 */
public interface ProductSearchService {
    public SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request);
}
