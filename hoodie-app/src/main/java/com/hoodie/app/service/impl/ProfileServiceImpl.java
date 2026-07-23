/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProfileInitialApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.ProfileDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.UploadResult;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.ProfileRepository;
import com.hoodie.app.repository.UserRepository;
import com.hoodie.app.service.CloudinaryService;
import com.hoodie.app.service.ProfileService;

import lombok.RequiredArgsConstructor;

/**
 * ProfileServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    /**
     * ProfileRepository
     */
    @Autowired
    private ProfileRepository profileRepository;

    /**
     * UserRepository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * CloudinaryService
     */
    @Autowired
    private CloudinaryService cloudinaryService;

    /**
     * initial
     * 
     * @param request
     * @return SearchResponse<ProfileDomainModel>
     */
    @Override
    public SearchResponse<ProfileDomainModel> initial(User currentUser,
            SubmitRequestModel<ProfileInitialApplicationModel> request) {
        List<ProfileDomainModel> listModel = new ArrayList<ProfileDomainModel>();
        SearchResponse<ProfileDomainModel> results = new SearchResponse<ProfileDomainModel>(0, listModel);
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidateInit(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        String requestType = request.getRequestType();
//        ProductSearchApplicationModel productSearchApplicationModel = productMapper.map(request.getModel());

        switch (requestType) {
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL:
            results = profileRepository.search(currentUser, request.getModel());
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
     * submitProduct
     * 
     * @throws Exception
     */
    @Override
    public SubmitResponseModel submit(User currentUser, SubmitRequestModel<ProfileInitialApplicationModel> request,
            List<MultipartFile> images) throws Exception {

        // check validate
//        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        SubmitResponseModel submitResponseModel = new SubmitResponseModel();
        // submit update
        if (!CheckLogic.isSubmitEntry(request.getRequestType())) {
            submitResponseModel = update(currentUser, request.getModel(), images);
        }

        return submitResponseModel;
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     * @throws Exception
     */
    private SubmitResponseModel update(User currentUser, ProfileInitialApplicationModel request,
            List<MultipartFile> images) throws Exception {
        User user = new User();
        user = userRepository.findByUserIdAndEmailAndDeleteFlag(currentUser.getUserId(), request.getEmail(),
                Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isNotNull(user)) {
            user.setFullName(request.getFullName());
            user.setPhone(request.getPhone());
            user.setBirthDate(request.getBirthDate());
            user.setGender(request.getGender());
            user.setNote(request.getNote());
        }
        if (CheckLogic.isBlank(user.getAvatarUrl())) {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                UploadResult upload = cloudinaryService.upload(image, Constant.PRODUCTS);
                user.setAvatarUrl(upload.getUrl()); // link image
                user.setReserveItem01(upload.getPublicId()); // public id
                user.setReserveItem02(image.getOriginalFilename()); // alt
            }
        }
        user.setUpdatedAt(OffsetDateTime.now());
        user = userRepository.save(user);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        return response;
    }
}
