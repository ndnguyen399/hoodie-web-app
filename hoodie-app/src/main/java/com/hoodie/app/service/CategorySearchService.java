/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CategorySearchService class
 */
public interface CategorySearchService {
    public SearchResponse<CategorySearchDomainModel> search(CategorySearchApplicationModel request);
}
