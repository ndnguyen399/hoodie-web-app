/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CategoryInitialApplicationModel;
import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.application.model.CategorySubmitDeleteApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CategoryService class
 */
public interface CategoryService {
    public SearchResponse<CategorySearchDomainModel> initialCategory(
            SubmitRequestModel<CategoryInitialApplicationModel> request);

    public SubmitResponseModel submitCategory(SubmitRequestModel<CategorySubmitApplicationModel> request);

    public SubmitResponseModel deleteCategory(SubmitRequestModel<CategorySubmitDeleteApplicationModel> request);
}
