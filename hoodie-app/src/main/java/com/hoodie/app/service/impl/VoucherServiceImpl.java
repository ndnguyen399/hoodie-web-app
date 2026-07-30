/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.VoucherSubmitApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.entity.Voucher;
import com.hoodie.app.repository.VoucherRepository;
import com.hoodie.app.service.VoucherService;

import lombok.RequiredArgsConstructor;

/**
 * VoucherServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {

    /**
     * VoucherRepository
     */
    @Autowired
    private VoucherRepository voucherRepository;

    /**
     * submit
     */
    @Override
    public SubmitResponseModel submit(SubmitRequestModel<VoucherSubmitApplicationModel> request) {
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        SubmitResponseModel submitResponseModel = new SubmitResponseModel();
        // submit create
        if (CheckLogic.isSubmitEntry(request.getRequestType())) {
            submitResponseModel = create(request.getModel());
        } else {
            // submit update
//            submitResponseModel = update(request.getModel());
        }

        return submitResponseModel;
    }

    /**
     * delete
     */
    @Override
    public SubmitResponseModel delete(SubmitRequestModel<VoucherSubmitApplicationModel> request) {
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidateDelete(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }
        // submit delete
        SubmitResponseModel submitResponseModel = delete(request.getModel());

        return submitResponseModel;
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel create(VoucherSubmitApplicationModel request) {
        Voucher voucher = new Voucher();
//                categoryMapper.map(request);
        voucher.setPromotionCode(request.getPromotionCode());
        voucher.setPromotionName(request.getPromotionName());
        voucher.setDescription(request.getDescription());

        voucher.setDiscountValue(request.getDiscountValue());
        voucher.setMinOrderValue(request.getMinOrderValue());
        voucher.setMaxDiscountAmount(request.getMaxDiscountAmount());
        voucher.setUsageIimit(100);

        voucher.setStartDate(request.getStartDate());
        voucher.setEndDate(request.getEndDate());

        voucher.setIsActive(true);
        voucher.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        voucherRepository.save(voucher);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        return response;
    }

    /**
     * delete
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel delete(VoucherSubmitApplicationModel request) {
        Voucher voucher = voucherRepository.findByPromotionIdAndDeleteFlag(request.getPromotionId(),
                Constant.DELETE_FLAG_ZERO);

//        categoryMapper.deleteEntity(request, category);
        voucher.setDeleteFlag(Constant.DELETE_FLAG_ONE);
        voucherRepository.save(voucher);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_DELETE_SUCCESS);
        return response;
    }
}
