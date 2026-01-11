/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CategorySearchRepositoryCustom class
 */
public interface CategorySearchRepositoryCustom {
    SearchResponse<CategorySearchDomainModel> search(CategorySearchApplicationModel request);
}
