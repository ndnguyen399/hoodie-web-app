/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CartSearchApplicationModel;
import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.CartRepository;
import com.hoodie.app.service.CartSearchService;

import lombok.RequiredArgsConstructor;

/**
 * CartSearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CartSearchServiceImpl implements CartSearchService {
    /**
     * CartRepository
     */
    @Autowired
    private CartRepository cartRepository;

    /**
     * search
     * 
     * @param request {@link CartSearchApplicationModel}
     * @return {@link SearchResponse<CartSearchDomainModel>}
     */
    @Override
    public SearchResponse<CartSearchDomainModel> search(Long userId) {
        return cartRepository.search(userId);
    }
}
