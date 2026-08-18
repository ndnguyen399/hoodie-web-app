/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProductInitialApplicationModel;
import com.hoodie.app.application.model.ProductSubmitApplicationModel;
import com.hoodie.app.application.model.ProductSubmitDeleteApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * ProductService class
 */
public interface ProductService {
    /**
     * Initial
     */
    public SearchResponse<ProductSearchDomainModel> initialProduct(
            SubmitRequestModel<ProductInitialApplicationModel> request);

    /**
     * Submit
     */
    public SubmitResponseModel submitProduct(SubmitRequestModel<ProductSubmitApplicationModel> request,
            List<MultipartFile> images) throws Exception;

    /**
     * delete
     */
    public SubmitResponseModel delete(SubmitRequestModel<ProductSubmitDeleteApplicationModel> request);
}
