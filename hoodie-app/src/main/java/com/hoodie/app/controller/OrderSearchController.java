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

import com.hoodie.app.application.model.OrderSearchApplicationModel;
import com.hoodie.app.domain.model.OrderSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.OrderSearchService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * OrderSearchController class
 */
@RestController
@RequestMapping("/api/v1/order")
public class OrderSearchController {
    /**
     * OrderSearchService
     */
    @Autowired
    private OrderSearchService orderSearchService;

    /**
     * search
     * 
     * @param request {@link OrderSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<OrderSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<OrderSearchDomainModel>> search(@AuthenticationPrincipal User currentUser,
            @RequestBody OrderSearchApplicationModel request) {
        return BaseApiResponse.success(orderSearchService.search(currentUser, request));
    }

    /**
     * deleveryOrder
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/delevery-order")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> deleveryOrder(
            @RequestBody @Valid SubmitRequestModel<OrderSearchApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = orderSearchService.deleveryOrder(request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
