/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProfileInitialApplicationModel;
import com.hoodie.app.domain.model.ProfileDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * ProfileService class
 */
public interface ProfileService {
    /**
     * Initial
     */
    public SearchResponse<ProfileDomainModel> initial(User currentUser,
            SubmitRequestModel<ProfileInitialApplicationModel> request);

    public SubmitResponseModel submit(User currentUser, SubmitRequestModel<ProfileInitialApplicationModel> request,
            List<MultipartFile> images) throws Exception;
}
