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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProfileInitialApplicationModel;
import com.hoodie.app.domain.model.ProfileDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.ProfileService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * ProfileSubmitController class
 */
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileSubmitController {
    /**
     * ProfileService
     */
    @Autowired
    private ProfileService profileService;

    /**
     * initial
     * 
     * @param request {@link ProfileInitialApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<ProfileDomainModel>>}
     */
    @PostMapping("/initial")
    public BaseApiResponse<SearchResponse<ProfileDomainModel>> initial(@AuthenticationPrincipal User currentUser,
            @RequestBody SubmitRequestModel<ProfileInitialApplicationModel> request) {
        return BaseApiResponse.success(profileService.initial(currentUser, request));
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
            @RequestPart @Valid SubmitRequestModel<ProfileInitialApplicationModel> request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws Exception {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = profileService.submit(currentUser, request, images);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
