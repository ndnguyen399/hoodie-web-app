/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.service.ProductSearchService;

/**
 * ProductSearchController class
 */
@RestController
@RequestMapping("/api/v1/product")
public class ProductSearchController {

    /**
     * ProductSearchService
     */
    @Autowired
    private ProductSearchService productSearchService;

    /**
     * search
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<ProductSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<ProductSearchDomainModel>> search(
            @RequestBody ProductSearchApplicationModel request) {
        return BaseApiResponse.success(productSearchService.search(request));
    }
}
