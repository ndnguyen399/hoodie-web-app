/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.UserSearchApplicationModel;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.constant.Role;
import com.hoodie.app.domain.model.UserSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.UserRepository;
import com.hoodie.app.service.UserSearchService;

import lombok.RequiredArgsConstructor;

/**
 * UserSearchServiceImpl
 */
@Service
@RequiredArgsConstructor
public class UserSearchServiceImpl implements UserSearchService {

    /**
     * UserRepository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * search
     */
    @Override
    public SearchResponse<UserSearchDomainModel> search(UserSearchApplicationModel request) {
        List<User> users = new ArrayList<User>();

        users = userRepository.findByRoleAndDeleteFlag(Role.ROLE_CUSTOMER, Constant.DELETE_FLAG_ZERO);

        List<UserSearchDomainModel> listData = users.stream().map(this::toSearchDomainModel).toList();

        return new SearchResponse<>((long) listData.size(), listData);
    }

    /**
     * toSearchDomainModel
     * 
     * @param voucher
     * @return
     */
    private UserSearchDomainModel toSearchDomainModel(User user) {
        UserSearchDomainModel model = new UserSearchDomainModel();
        model.setUserId(user.getUserId());
        model.setFullName(user.getFullName());
        model.setEmail(user.getEmail());
        model.setPhone(user.getPhone());
        model.setBirthDate(user.getBirthDate());
        model.setGender(user.getGender());
        model.setNote(user.getNote());
        model.setCreatedAt(user.getCreatedAt());
        model.setUpdatedAt(user.getUpdatedAt());
        model.setDeleteFlag(user.getDeleteFlag());

        return model;
    }

    /**
     * block
     */
    @Override
    public SubmitResponseModel block(SubmitRequestModel<UserSearchApplicationModel> request) {
        User user = userRepository.findByUserIdAndEmailAndDeleteFlag(request.getModel().getUserId(),
                request.getModel().getEmail(), Constant.DELETE_FLAG_ZERO);
        user.setDeleteFlag(Constant.DELETE_FLAG_ONE);
        userRepository.save(user);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_UPDATE_SUCCESS);
        return response;
    }
}
