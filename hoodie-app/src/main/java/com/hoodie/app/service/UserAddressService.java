/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.UserAddressInitialApplicationModel;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * UserAddressService class
 */
public interface UserAddressService {
    public SearchResponse<UserAddressSearchDomainModel> initial(User currentUser,
            SubmitRequestModel<UserAddressInitialApplicationModel> request);

    public SubmitResponseModel submit(User currentUser, SubmitRequestModel<UserAddressInitialApplicationModel> request);
}
