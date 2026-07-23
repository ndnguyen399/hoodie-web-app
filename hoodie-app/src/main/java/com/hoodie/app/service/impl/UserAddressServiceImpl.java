/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.UserAddressInitialApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.entity.UserAddress;
import com.hoodie.app.repository.UserAddressRepository;
import com.hoodie.app.service.UserAddressService;

import lombok.RequiredArgsConstructor;

/**
 * UserAddressServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class UserAddressServiceImpl implements UserAddressService {

    /**
     * UserAddressRepository
     */
    @Autowired
    private UserAddressRepository userAddressRepository;

    /**
     * initial
     */
    @Override
    public SearchResponse<UserAddressSearchDomainModel> initial(User currentUser,
            SubmitRequestModel<UserAddressInitialApplicationModel> request) {
        List<UserAddressSearchDomainModel> listModel = new ArrayList<UserAddressSearchDomainModel>();
        SearchResponse<UserAddressSearchDomainModel> results = new SearchResponse<UserAddressSearchDomainModel>(0,
                listModel);
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidateInit(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        String requestType = request.getRequestType();

        switch (requestType) {
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL:
            results = userAddressRepository.search(currentUser, request.getModel());
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_CREATE:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_DETAIL:
        default:
            break;
        }
        return results;
    }

    /**
     * submit
     */
    @Override
    public SubmitResponseModel submit(User currentUser,
            SubmitRequestModel<UserAddressInitialApplicationModel> request) {
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        SubmitResponseModel submitResponseModel = new SubmitResponseModel();
        // submit create
        if (CheckLogic.isSubmitEntry(request.getRequestType())) {
            submitResponseModel = create(currentUser, request.getModel());
        } else {
            // submit update
//            submitResponseModel = update(request.getModel());
        }

        return submitResponseModel;
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel create(User currentUser, UserAddressInitialApplicationModel request) {
        UserAddress userAddress = new UserAddress();
        userAddress.setUserId(currentUser.getUserId());
        userAddress.setRecipientName(request.getRecipientName());
        userAddress.setPhone(request.getPhone());
        userAddress.setStreet(request.getStreet());
        userAddress.setWard(request.getWard());
        userAddress.setDistrict(request.getDistrict());
        userAddress.setCity(request.getCity());
        List<UserAddress> listUserAddress = userAddressRepository.findByUserIdAndDeleteFlag(currentUser.getUserId(),
                Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isEmpty(listUserAddress)) {
            userAddress.setIsDefault(true);
        } else {
            userAddress.setIsDefault(false);
        }
        userAddress.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        userAddressRepository.save(userAddress);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        return response;
    }

}
