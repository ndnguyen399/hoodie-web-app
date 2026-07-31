/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.UserSearchApplicationModel;
import com.hoodie.app.domain.model.UserSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.service.UserSearchService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * UserSearchController
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserSearchController {
    /**
     * UserSearchService
     */
    @Autowired
    private UserSearchService userSearchService;

    /**
     * search
     * 
     * @param request {@link UserSearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<UserSearchDomainModel>>}
     */
    @PostMapping("/search")
    public BaseApiResponse<SearchResponse<UserSearchDomainModel>> search(
            @RequestBody UserSearchApplicationModel request) {
        return BaseApiResponse.success(userSearchService.search(request));
    }

    /**
     * deleveryOrder
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/block")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> deleveryOrder(
            @RequestBody @Valid SubmitRequestModel<UserSearchApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = userSearchService.block(request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
