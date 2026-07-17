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

import com.hoodie.app.application.model.CheckoutInitialApplicationModel;
import com.hoodie.app.domain.model.CheckoutInitialDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.CheckoutService;

/**
 * CheckoutController class
 */
@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutSubmitController {
    /**
     * CheckoutService
     */
    @Autowired
    private CheckoutService checkoutService;

    /**
     * initial
     * 
     * @param request {@link CheckoutInitialApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<CheckoutInitialDomainModel>>}
     */
    @PostMapping("/initial")
    public BaseApiResponse<SearchResponse<CheckoutInitialDomainModel>> initial(
            @AuthenticationPrincipal User currentUser,
            @RequestBody SubmitRequestModel<CheckoutInitialApplicationModel> request) {
        return BaseApiResponse.success(checkoutService.initial(currentUser, request));
    }
}
