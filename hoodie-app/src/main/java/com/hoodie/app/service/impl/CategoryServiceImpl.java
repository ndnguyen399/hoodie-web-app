/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CategoryInitialApplicationModel;
import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.application.model.CategorySubmitDeleteApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
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

    /**
     * initial
     * 
     * @param request
     * @return SearchResponse<CategorySearchDomainModel>
     */
    @Override
    public SearchResponse<CategorySearchDomainModel> initialCategory(
            SubmitRequestModel<CategoryInitialApplicationModel> request) {
        List<CategorySearchDomainModel> listModel = new ArrayList<CategorySearchDomainModel>();
        SearchResponse<CategorySearchDomainModel> results = new SearchResponse<CategorySearchDomainModel>(0, listModel);
        // check validate
        List<ValidationErrorItem> errors = this.checkValidateInit(request.getModel(), request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

        String requestType = request.getRequestType();
        CategorySearchApplicationModel categorySearchDomainModel = categoryMapper.map(request.getModel());

        switch (requestType) {
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_CREATE:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE:
            results = categoryRepository.search(categorySearchDomainModel);
            break;
        default:
            break;
        }
        return results;
    }

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
     * deleteCategory
     * 
     * @param request
     * @return SubmitResponseModel
     */
    @Override
    public SubmitResponseModel deleteCategory(SubmitRequestModel<CategorySubmitDeleteApplicationModel> request) {
        // check validate
        List<ValidationErrorItem> errors = this.checkValidateDelete(request.getModel(), request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }
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
        response.setMessage(Constant.INFO_UPDATE_SUCCESS);
        return response;
    }

    /**
     * delete
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitResponseModel delete(CategorySubmitDeleteApplicationModel request) {
        Category category = categoryRepository.findByCategoryIdAndDeleteFlag(request.getCategoryId(),
                Constant.DELETE_FLAG_ZERO);

//        categoryMapper.deleteEntity(request, category);
        category.setDeleteFlag(Constant.DELETE_FLAG_ONE);
        categoryRepository.save(category);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_DELETE_SUCCESS);
        return response;
    }

    /**
     * checkValidateInit
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidateInit(CategoryInitialApplicationModel request, String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
        }
        // case update
        if (Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE.equals(requestType)) {
            // check NULL CategoryId
            if (!CheckLogic.isValidId(request.getCategoryId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
            }
        }
        return errors;
    }

    /**
     * checkValidate
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidate(CategorySubmitApplicationModel request, String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
        }
        // case update
        if (CheckLogic.isSubmitEntry(requestType)) {
            // check EXISTS CategoryName
            Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
                    Constant.DELETE_FLAG_ZERO);
            if (CheckLogic.isNotNull(category)) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
            }
        } else {
            // check NULL CategoryId
            if (!CheckLogic.isValidId(request.getCategoryId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
            }
            // check EXISTS CategoryId
            Category categoryId = categoryRepository.findByCategoryIdAndDeleteFlag(request.getCategoryId(),
                    Constant.DELETE_FLAG_ZERO);
            if (CheckLogic.isNull(categoryId)) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
            }
            // check EXISTS CategoryName
            Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
                    Constant.DELETE_FLAG_ZERO);
            if (CheckLogic.isNotNull(category) && !category.getCategoryId().equals(request.getCategoryId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
            }
        }

        return errors;
    }

    /**
     * checkValidateDelete
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidateDelete(CategorySubmitDeleteApplicationModel request,
            String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
        }
        // check valid requestType
        if (!Constant.CONSTANT_SUBMIT_REQUEST_TYPE_DELETE.equals(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_VALID));
        }
        // check NULL CategoryId
        if (!CheckLogic.isValidId(request.getCategoryId())) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
        }
        // check EXISTS CategoryId
        Category category = categoryRepository.findByCategoryIdAndDeleteFlag(request.getCategoryId(),
                Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isNull(category)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
        }
        return errors;
    }
}
