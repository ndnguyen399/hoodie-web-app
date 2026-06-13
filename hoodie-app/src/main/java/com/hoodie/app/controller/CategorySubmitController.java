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

import com.hoodie.app.application.model.CategoryInitialApplicationModel;
import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.application.model.CategorySubmitDeleteApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.service.CategoryService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * CategorySubmitController class
 */
@RestController
@RequestMapping("/api/v1/category")
public class CategorySubmitController {
    /**
     * CategorySearchService
     */
    @Autowired
    private CategoryService categoryService;

    /**
     * initial
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @return {@link BaseApiResponse<SearchResponse<CategorySearchDomainModel>>}
     */
    @PostMapping("/initial")
    public BaseApiResponse<SearchResponse<CategorySearchDomainModel>> initial(
            @RequestBody SubmitRequestModel<CategoryInitialApplicationModel> request) {
        return BaseApiResponse.success(categoryService.initialCategory(request));
    }

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(
            @RequestBody @Valid SubmitRequestModel<CategorySubmitApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = categoryService.submitCategory(request);
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
    public BaseApiResponse<List<SubmitResponseModel>> submitDelete(
            @RequestBody @Valid SubmitRequestModel<CategorySubmitDeleteApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = categoryService.deleteCategory(request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
