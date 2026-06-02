/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.error.ValidationErrorItem;
import com.hoodie.app.entity.Category;
import com.hoodie.app.exception.BusinessValidationException;
import com.hoodie.app.mapper.CategoryMapper;
import com.hoodie.app.repository.CategoryRepository;
import com.hoodie.app.service.CategoryService;

import lombok.RequiredArgsConstructor;

/**
 * CategoryServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    /**
     * CategoryRepository
     */
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * CategoryMapper
     */
    @Autowired
    private CategoryMapper categoryMapper;
//    private final CategoryMapper categoryMapper;

    /**
     * submitCategory
     * 
     * @param request
     * @return SubmitResponseModel
     */
    @Override
    public SubmitResponseModel submitCategory(SubmitRequestModel<CategorySubmitApplicationModel> request) {
        // check validate
        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

        SubmitResponseModel submitResponseModel = new SubmitResponseModel();
        // submit create
        if (CheckLogic.isSubmitEntry(request.getRequestType())) {
            submitResponseModel = create(request.getModel());
        } else {
            // submit update
            submitResponseModel = update(request.getModel());
        }

        return submitResponseModel;
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel create(CategorySubmitApplicationModel request) {

        Category category = categoryMapper.map(request);
        category.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        categoryRepository.save(category);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        return response;
    }

    /**
     * update
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel update(CategorySubmitApplicationModel request) {

        Category category = categoryRepository.findByCategoryIdAndDeleteFlag(request.getCategoryId(),
                Constant.DELETE_FLAG_ZERO);

        categoryMapper.updateEntity(request, category);
        categoryRepository.save(category);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        return response;
    }

    /**
     * checkValidate
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidate(CategorySubmitApplicationModel request, String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // case update
        if (!CheckLogic.isSubmitEntry(requestType)) {
            // check NULL CategoryId
            if (!CheckLogic.isValidId(request.getCategoryId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
            }
        }

        // check EXISTS CategoryName
        Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
                Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isNotNull(category)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
        }
        return errors;
    }
}
