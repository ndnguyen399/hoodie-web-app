/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.VoucherSubmitApplicationModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;

/**
 * VoucherService class
 */
public interface VoucherService {
    public SubmitResponseModel submit(SubmitRequestModel<VoucherSubmitApplicationModel> request);

    public SubmitResponseModel delete(SubmitRequestModel<VoucherSubmitApplicationModel> request);
}
