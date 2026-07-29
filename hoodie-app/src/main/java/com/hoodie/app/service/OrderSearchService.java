/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.OrderSearchApplicationModel;
import com.hoodie.app.domain.model.OrderSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * OrderSearchService
 */
public interface OrderSearchService {
    public SearchResponse<OrderSearchDomainModel> search(User currentUser, OrderSearchApplicationModel request);

    public SubmitResponseModel deleveryOrder(SubmitRequestModel<OrderSearchApplicationModel> request);
}
