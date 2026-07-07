/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CartSearchRepositoryCustom
 */
public interface CartSearchRepositoryCustom {
    SearchResponse<CartSearchDomainModel> search(Long userId);
}
