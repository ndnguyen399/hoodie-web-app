/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.VoucherSearchApplicationModel;
import com.hoodie.app.domain.model.VoucherSearchDomainModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.service.VoucherSearchService;

/**
 * VoucherSearchController
 */
@RestController
@RequestMapping("/api/v1/voucher")
public class VoucherSearchController {
    /**
     * VoucherSearchService
     */
    @Autowired
    private VoucherSearchService voucherSearchService;

    /**
     * search
     * 
     * @param request {@link VoucherSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<ProductSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<VoucherSearchDomainModel>> search(
            @RequestBody VoucherSearchApplicationModel request) {
        return BaseApiResponse.success(voucherSearchService.search(request));
    }
}
