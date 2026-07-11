/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CheckoutInitialApplicationModel;
import com.hoodie.app.domain.model.CheckoutInitialDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * CheckoutService class
 */
public interface CheckoutService {
    public SearchResponse<CheckoutInitialDomainModel> initial(
            User currentUser, SubmitRequestModel<CheckoutInitialApplicationModel> request);
}
