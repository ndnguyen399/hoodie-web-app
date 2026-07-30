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

import com.hoodie.app.application.model.VoucherSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.service.VoucherService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * VoucherSubmitController class
 */
/**
 * CategorySubmitController class
 */
@RestController
@RequestMapping("/api/v1/voucher")
public class VoucherSubmitController {
    /**
     * VoucherService
     */
    @Autowired
    private VoucherService voucherService;

    /**
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitResponseModel>> submit(
            @RequestBody @Valid SubmitRequestModel<VoucherSubmitApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = voucherService.submit(request);
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
            @RequestBody @Valid SubmitRequestModel<VoucherSubmitApplicationModel> request) {
        List<SubmitResponseModel> lists = new ArrayList<>();
        SubmitResponseModel response = voucherService.delete(request);
        lists.add(response);
        return BaseApiResponse.success(lists);
    }
}
