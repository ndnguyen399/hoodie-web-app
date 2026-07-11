/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.CheckoutInitialApplicationModel;
import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.domain.model.CheckoutInitialDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.CheckoutService;
import com.hoodie.app.service.OrderService;
import com.hoodie.app.service.PaymentService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * CheckoutController class
 */
@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutSubmitController {

    /**
     * OrderService
     */
    @Autowired
    private OrderService orderService;

    /**
     * PaymentService
     */
    @Autowired
    private PaymentService paymentService;

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

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(@AuthenticationPrincipal User currentUser,
            @RequestBody @Valid SubmitRequestModel<CheckoutSubmitApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = orderService.submit(currentUser, request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
