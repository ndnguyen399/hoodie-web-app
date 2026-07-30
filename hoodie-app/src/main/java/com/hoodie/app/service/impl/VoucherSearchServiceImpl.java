/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.VoucherSearchApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.VoucherSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.Voucher;
import com.hoodie.app.repository.VoucherRepository;
import com.hoodie.app.service.VoucherSearchService;

import lombok.RequiredArgsConstructor;

/**
 * VoucherSearchServiceImpl
 */
@Service
@RequiredArgsConstructor
public class VoucherSearchServiceImpl implements VoucherSearchService {

    /**
     * VoucherRepository
     */
    @Autowired
    private VoucherRepository voucherRepository;

    /**
     * search
     */
    @Override
    public SearchResponse<VoucherSearchDomainModel> search(VoucherSearchApplicationModel request) {
        List<Voucher> vouchers = new ArrayList<Voucher>();
        if (CheckLogic.isNotBlank(request.getPromotionCode())) {
            vouchers = voucherRepository.findByPromotionCodeAndDeleteFlag(request.getPromotionCode(),
                    Constant.DELETE_FLAG_ZERO);
        } else {
            vouchers = voucherRepository.findByDeleteFlag(Constant.DELETE_FLAG_ZERO);
        }

        List<VoucherSearchDomainModel> listData = vouchers.stream().map(this::toSearchDomainModel).toList();

        return new SearchResponse<>((long) listData.size(), listData);

    }

    /**
     * toSearchDomainModel
     * 
     * @param voucher
     * @return
     */
    private VoucherSearchDomainModel toSearchDomainModel(Voucher voucher) {
        VoucherSearchDomainModel model = new VoucherSearchDomainModel();
        model.setPromotionId(voucher.getPromotionId());
        model.setPromotionCode(voucher.getPromotionCode());
        model.setPromotionName(voucher.getPromotionName());
        model.setDescription(voucher.getDescription());

        model.setDiscountValue(voucher.getDiscountValue());
        model.setMinOrderValue(voucher.getMinOrderValue());
        model.setMaxDiscountAmount(voucher.getMaxDiscountAmount());
        model.setUsageLimit(voucher.getUsageIimit());

        model.setStartDate(voucher.getStartDate());
        model.setEndDate(voucher.getEndDate());

        model.setIsActive(voucher.getIsActive());

        return model;
    }
}
