/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProductSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;

/**
 * ProductService class
 */
public interface ProductService {
    public SubmitResponseModel submitProduct(SubmitRequestModel<ProductSubmitApplicationModel> request,
            List<MultipartFile> images) throws Exception;
}
