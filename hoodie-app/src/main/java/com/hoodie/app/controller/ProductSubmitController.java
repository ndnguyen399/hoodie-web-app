/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProductSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.service.ProductService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * ProductSubmitController class
 */
@RestController
@RequestMapping("/api/v1/product")
public class ProductSubmitController {
    /**
     * ProductSearchService
     */
    @Autowired
    private ProductService productService;

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     * @throws Exception
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(
            @RequestPart @Valid SubmitRequestModel<ProductSubmitApplicationModel> request,
            @RequestPart("images") @Valid List<MultipartFile> images) throws Exception {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = productService.submitProduct(request, images);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
