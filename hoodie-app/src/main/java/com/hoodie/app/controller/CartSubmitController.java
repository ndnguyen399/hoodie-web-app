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

import com.hoodie.app.application.model.CartSubmitApplicationModel;
import com.hoodie.app.application.model.CartSubmitDeleteApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.CartService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * CartSubmitController class
 */
@RestController
@RequestMapping("/api/v1/cart")
public class CartSubmitController {

    /**
     * CartService
     */
    @Autowired
    private CartService cartService;

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(@AuthenticationPrincipal User currentUser,
            @RequestBody @Valid SubmitRequestModel<CartSubmitApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = cartService.submitCart(currentUser, request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }

    /**
     * submitDelete
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submitDelete")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submitDelete(@AuthenticationPrincipal User currentUser,
            @RequestBody @Valid SubmitRequestModel<CartSubmitDeleteApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = cartService.submitDelete(currentUser, request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
