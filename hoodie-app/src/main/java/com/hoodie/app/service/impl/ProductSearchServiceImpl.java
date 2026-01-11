/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.ProductRepository;
import com.hoodie.app.service.ProductSearchService;

import lombok.RequiredArgsConstructor;

/**
 * ProductSearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class ProductSearchServiceImpl implements ProductSearchService {

    /**
     * ProductRepository
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * search
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link SearchResponse<ProductSearchDomainModel>}
     */
    @Override
    public SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request) {
        return productRepository.search(request);
    }

}
