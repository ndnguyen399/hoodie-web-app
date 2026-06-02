/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;

/**
 * CategoryService class
 */
public interface CategoryService {
    public SubmitResponseModel submitCategory(SubmitRequestModel<CategorySubmitApplicationModel> request);
}
