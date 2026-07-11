/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.entity.User;
import com.hoodie.app.service.OrderService;

import lombok.RequiredArgsConstructor;

/**
 * OrderServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    @Override
    public SubmitResponseModel submit(User currentUser, SubmitRequestModel<CheckoutSubmitApplicationModel> request) {
        // TODO Auto-generated method stub
        return null;
    }

}
