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

import com.hoodie.app.application.model.UserAddressInitialApplicationModel;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.UserAddressService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * UserAddressSubmitController class
 */
@RestController
@RequestMapping("/api/v1/user-address")
public class UserAddressSubmitController {
    /**
     * UserAddressService
     */
    @Autowired
    private UserAddressService userAddressService;

    /**
     * initial
     * 
     * @param request {@link UserAddressInitialApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<UserAddressDomainModel>>}
     */
    @PostMapping("/initial")
    public BaseApiResponse<SearchResponse<UserAddressSearchDomainModel>> initial(
            @AuthenticationPrincipal User currentUser,
            @RequestBody SubmitRequestModel<UserAddressInitialApplicationModel> request) {
        return BaseApiResponse.success(userAddressService.initial(currentUser, request));
    }

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     * @throws Exception
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(@AuthenticationPrincipal User currentUser,
            @RequestBody @Valid SubmitRequestModel<UserAddressInitialApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = userAddressService.submit(currentUser, request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
