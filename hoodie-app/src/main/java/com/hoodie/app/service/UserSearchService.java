/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.UserSearchApplicationModel;
import com.hoodie.app.domain.model.UserSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * UserSearchService
 */
public interface UserSearchService {
    public SearchResponse<UserSearchDomainModel> search(UserSearchApplicationModel request);

    public SubmitResponseModel block(SubmitRequestModel<UserSearchApplicationModel> request);
}
