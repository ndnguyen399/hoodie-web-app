/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.SubmitPaymentResponseModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.response.BaseApiResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.OrderService;
import com.hoodie.app.service.PaymentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * PaymentController
 */
@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

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
     * submit
     * 
     * @param request
     * @return BaseApiResponse<SubmitResponseModel>
     */
    @PostMapping("/submit")
    @Transactional
    public BaseApiResponse<List<SubmitPaymentResponseModel>> submit(@AuthenticationPrincipal User currentUser,
            HttpServletRequest servletRequest,
            @RequestBody @Valid SubmitRequestModel<CheckoutSubmitApplicationModel> request) {
        List<SubmitPaymentResponseModel> lists = new ArrayList<>();
        SubmitPaymentResponseModel response = orderService.submit(currentUser, request);
        request.getModel().setOrderId(response.getOrderId());

        if (Constant.PAYMENT_METHOD_COD.equals(request.getModel().getPaymentMethod())) {
            return BaseApiResponse.success(lists);
        } else {
            SubmitPaymentResponseModel response_payment = paymentService.submit(currentUser, servletRequest, request);
            lists.add(response_payment);
            return BaseApiResponse.success(lists);
        }
    }

    /**
     * vnpayReturn
     * 
     * @param request
     * @return
     */
    @GetMapping("/vnpay-return")
    @Transactional
    public ResponseEntity<Void> vnpayReturn(HttpServletRequest request) {
        String redirectUrl = paymentService.processVNPayReturn(request);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirectUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}
