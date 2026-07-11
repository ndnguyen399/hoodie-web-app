/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.entity.User;

/**
 * OrderService class
 */
public interface OrderService {
    public SubmitResponseModel submit(User currentUser, SubmitRequestModel<CheckoutSubmitApplicationModel> request);
}
