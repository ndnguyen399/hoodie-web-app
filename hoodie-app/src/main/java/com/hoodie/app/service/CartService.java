/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CartSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.entity.User;

/**
 * CartService
 */
public interface CartService {
    public SubmitResponseModel submitCart(User currentUser, SubmitRequestModel<CartSubmitApplicationModel> request);
}
