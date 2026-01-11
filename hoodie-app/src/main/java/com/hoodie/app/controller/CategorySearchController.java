/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.service.CategorySearchService;

/**
 * CategorySearchController class
 */
@RestController
@RequestMapping("/api/v1/category")
public class CategorySearchController {
    /**
     * CategorySearchService
     */
    @Autowired
    private CategorySearchService categorySearchService;

    /**
     * search
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<ProductSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<CategorySearchDomainModel>> search(
            @RequestBody CategorySearchApplicationModel request) {
        try {
            return BaseApiResponse.success(categorySearchService.search(request));
        } catch (Exception e) {
            return BaseApiResponse.fail(e.getMessage());
        }
    }
}
