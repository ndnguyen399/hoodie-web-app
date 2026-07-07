/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CartSearchService class
 */
public interface CartSearchService {
    public SearchResponse<CartSearchDomainModel> search(Long userId);
}
