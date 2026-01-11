/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * ProductSearchRepositoryCustom class
 */
public interface ProductSearchRepositoryCustom {
    SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request);
}
