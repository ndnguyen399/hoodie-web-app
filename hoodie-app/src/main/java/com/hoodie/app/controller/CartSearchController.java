/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.CartSearchApplicationModel;
import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.CartSearchService;

/**
 * CartSearchController class
 */
@RestController
@RequestMapping("/api/v1/cart")
public class CartSearchController {
    /**
     * CartSearchService
     */
    @Autowired
    private CartSearchService cartSearchService;

    /**
     * search
     * 
     * @param request {@link CartSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<CartSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<CartSearchDomainModel>> search(@AuthenticationPrincipal User currentUser,
            @RequestBody CartSearchApplicationModel request) {
        return BaseApiResponse.success(cartSearchService.search(currentUser.getUserId()));
    }
}
