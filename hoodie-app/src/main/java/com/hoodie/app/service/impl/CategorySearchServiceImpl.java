/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.CategoryRepository;
import com.hoodie.app.service.CategorySearchService;

import lombok.RequiredArgsConstructor;

/**
 * CategorySearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CategorySearchServiceImpl implements CategorySearchService {

    /**
     * CategoryRepository
     */
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * search
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @return {@link SearchResponse<CategorySearchDomainModel>}
     */
    @Override
    public SearchResponse<CategorySearchDomainModel> search(CategorySearchApplicationModel request) {
        return categoryRepository.search(request);
    }

}
