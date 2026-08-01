/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.RevenueSearchApplicationModel;
import com.hoodie.app.domain.model.RevenueSearchDomainModel;
import com.hoodie.app.service.RevenueSearchService;

/**
 * RevenueSearchController class
 */
@RestController
@RequestMapping("/api/v1/revenue")
public class RevenueSearchController {
    /**
     * RevenueSearchService
     */
    @Autowired
    private RevenueSearchService revenueSearchService;

    /**
     * search
     * 
     * @param request {@link RevenueSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<RevenueSearchDomainModel>>}
     */
//    @PostMapping("/search")
//    public BaseApiResponse<SearchResponse<RevenueSearchDomainModel>> search(
//            @RequestBody RevenueSearchApplicationModel request) {
//        RevenueSearchDomainModel model = revenueSearchService.search(request);
//        SearchResponse<RevenueSearchDomainModel> result = new SearchResponse<RevenueSearchDomainModel>(0, model);
//        return BaseApiResponse.success(revenueSearchService.search(request));
//    }

    /**
     * search
     * 
     * @param request {@link RevenueSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<RevenueSearchDomainModel>>}
     */
    @PostMapping("/search")
    public ResponseEntity<RevenueSearchDomainModel> search(@RequestBody RevenueSearchApplicationModel request) {
        return ResponseEntity.ok(revenueSearchService.search(request));
    }
}
