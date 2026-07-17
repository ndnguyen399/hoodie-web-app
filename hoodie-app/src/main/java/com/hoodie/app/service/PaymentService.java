/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.dto.SubmitPaymentResponseModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.entity.User;

import jakarta.servlet.http.HttpServletRequest;

/**
 * PaymentService class
 */
public interface PaymentService {
    public SubmitPaymentResponseModel submit(User currentUser, HttpServletRequest servletRequest,
            SubmitRequestModel<CheckoutSubmitApplicationModel> request);

    String processVNPayReturn(HttpServletRequest request);
}
