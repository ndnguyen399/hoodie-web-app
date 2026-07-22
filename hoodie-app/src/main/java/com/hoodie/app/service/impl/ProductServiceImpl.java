/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.application.model.ProductInitialApplicationModel;
import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.application.model.ProductSubmitApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.UploadResult;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.dto.response.error.ValidationErrorItem;
import com.hoodie.app.entity.Product;
import com.hoodie.app.entity.ProductImage;
import com.hoodie.app.exception.BusinessValidationException;
import com.hoodie.app.mapper.ProductMapper;
import com.hoodie.app.repository.ProductImageRepository;
import com.hoodie.app.repository.ProductRepository;
import com.hoodie.app.service.CloudinaryService;
import com.hoodie.app.service.ProductSearchService;
import com.hoodie.app.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * ProductServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    /**
     * ProductSearchService
     */
    @Autowired
    private ProductSearchService productSearchService;

    /**
     * ProductRepository
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * ProductImageRepository
     */
    @Autowired
    private ProductImageRepository productImageRepository;

    /**
     * CloudinaryService
     */
    @Autowired
    private CloudinaryService cloudinaryService;

    /**
     * ProductMapper
     */
    @Autowired
    private ProductMapper productMapper;

    /**
     * initial
     * 
     * @param request
     * @return SearchResponse<ProductSearchDomainModel>
     */
    @Override
    public SearchResponse<ProductSearchDomainModel> initialProduct(
            SubmitRequestModel<ProductInitialApplicationModel> request) {
        List<ProductSearchDomainModel> listModel = new ArrayList<ProductSearchDomainModel>();
        SearchResponse<ProductSearchDomainModel> results = new SearchResponse<ProductSearchDomainModel>(0, listModel);
        // check validate
        List<ValidationErrorItem> errors = this.checkValidateInit(request.getModel(), request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

        String requestType = request.getRequestType();
        ProductSearchApplicationModel productSearchApplicationModel = productMapper.map(request.getModel());

        switch (requestType) {
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_CREATE:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE:
            results = productSearchService.search(productSearchApplicationModel);
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_DETAIL:
            results = productSearchService.search(productSearchApplicationModel);
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
    @Transactional
    public SubmitResponseModel submitProduct(SubmitRequestModel<ProductSubmitApplicationModel> request,
            List<MultipartFile> images) throws Exception {
//        // validate images
//        validateImages(images);

        // check validate
        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

        SubmitResponseModel submitResponseModel = new SubmitResponseModel();
        // submit create
        if (CheckLogic.isSubmitEntry(request.getRequestType())) {
            // validate images
            validateImages(images);
            submitResponseModel = create(request.getModel(), images);
        } else {
            // submit update
            if (images != null && !images.isEmpty()) {
                validateImages(images);
            }
            submitResponseModel = update(request.getModel(), images);
        }

        return submitResponseModel;
    }

    /**
     * update
     * 
     * @param request
     * @return SubmitResponseModel
     * @throws Exception
     */
    private SubmitResponseModel update(ProductSubmitApplicationModel request, List<MultipartFile> images)
            throws Exception {
        Product product = productRepository.findByProductIdAndDeleteFlag(request.getProductId(),
                Constant.DELETE_FLAG_ZERO);

        productMapper.updateEntity(request, product);
        productRepository.save(product);

        if (CheckLogic.isChangeImage(request.getChangeImageFlag())) {
            if (images != null && !images.isEmpty()) {
                replaceImages(product.getProductId(), images);
            }
        }

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_UPDATE_SUCCESS);
        return response;
    }

    /**
     * replaceImages
     * 
     * @param productId
     * @param images
     * @throws Exception
     */
    private void replaceImages(Integer productId, List<MultipartFile> images) throws Exception {

        List<ProductImage> oldImages = productImageRepository.findByProductIdAndDeleteFlag(productId,
                Constant.DELETE_FLAG_ZERO);

        for (ProductImage image : oldImages) {
            cloudinaryService.deleteImage(image.getPublicId(), Constant.PRODUCTS);
        }

        productImageRepository.deleteAll(oldImages);

        for (int i = 0; i < images.size(); i++) {
            MultipartFile file = images.get(i);

            UploadResult upload = cloudinaryService.upload(file, Constant.PRODUCTS);

            ProductImage productImage = new ProductImage();

            productImage.setProductId(productId);
            productImage.setPublicId(upload.getPublicId());
            productImage.setImageUrl(upload.getUrl());
            productImage.setAltText(file.getOriginalFilename());
            productImage.setDisplayOrder(i);
            productImage.setIsPrimary(i == 0);
            productImage.setDeleteFlag(Constant.DELETE_FLAG_ZERO);

            productImageRepository.save(productImage);
        }
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     * @throws Exception
     */
    private SubmitResponseModel create(ProductSubmitApplicationModel request, List<MultipartFile> images)
            throws Exception {
        Product product = new Product();
        product.setCategoryId(request.getCategoryId());
        product.setProductName(request.getProductName());
        product.setProductDescription(request.getProductDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setAgeGroup(request.getAgeGroup());
        product.setSkillStemType(request.getSkillStemType());
        product.setVideoUrl(request.getVideoUrl());
        product.setDifficultyLevel(request.getDifficultyLevel());
        product.setSafetyCertifications(request.getSafetyCertifications());
//        product.setSkillLogic(request.getSkillLogic());
//        product.setSkillCreative(request.getSkillCreative());
//        product.setSkillStem(request.getSkillStem());
//        product.setSkillMotor(request.getSkillMotor());
//        product.setSkillSocial(request.getSkillSocial());
        product.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        product = productRepository.save(product);

        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = images.get(i);

            UploadResult upload = cloudinaryService.upload(image, Constant.PRODUCTS);

            ProductImage productImage = new ProductImage();
            productImage.setProductId(product.getProductId());
            productImage.setPublicId(upload.getPublicId());
            productImage.setImageUrl(upload.getUrl());
            productImage.setAltText(image.getOriginalFilename());
            productImage.setDisplayOrder(i);
            productImage.setIsPrimary(i == 0);
            productImage.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
            productImageRepository.save(productImage);
        }

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
    public List<ValidationErrorItem> checkValidate(ProductSubmitApplicationModel request, String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
        }
        if (CheckLogic.isEmpty(request.getProductName())) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRODUCT_NOT_NULL_MESSAGE));
        }
        if (!CheckLogic.isValidId(request.getCategoryId())) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ID_NOT_NULL_MESSAGE));
        }
        if (!CheckLogic.isValidId(request.getStockQuantity())) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.STOCK_NOT_NULL_MESSAGE));
        }
        if (!CheckLogic.isValidId(request.getPrice())) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRICE_NOT_NULL_MESSAGE));
        }
//        if (CheckLogic.isEmpty(request.getSkillLogic())) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.SKILL_LOGIC_NOT_NULL_MESSAGE));
//        }
//        if (CheckLogic.isEmpty(request.getSkillCreative())) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.SKILL_CREATIVE_NOT_NULL_MESSAGE));
//        }
//        if (CheckLogic.isEmpty(request.getSkillMotor())) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.SKILL_MOTOR_NOT_NULL_MESSAGE));
//        }
//        if (CheckLogic.isEmpty(request.getSkillStem())) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.SKILL_STEM_NOT_NULL_MESSAGE));
//        }
//        if (CheckLogic.isEmpty(request.getSkillSocial())) {
//            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.SKILL_SOCIAL_NOT_NULL_MESSAGE));
//        }
        if (CheckLogic.isNotNull(errors)) {
            return errors;
        }
        // case create
        if (CheckLogic.isSubmitEntry(requestType)) {
            // check EXISTS ProducName
            Product product = productRepository.findByProductNameAndDeleteFlag(request.getProductName(),
                    Constant.DELETE_FLAG_ZERO);
            if (CheckLogic.isNotNull(product)) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRODUCT_ALREADY_EXISTS_MESSAGE));
            }
        } else {
            // case update
            // check NULL ProductId
            if (!CheckLogic.isValidId(request.getProductId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRODUCT_NOT_FOUND_MESSAGE));
            }
            Product product = productRepository.findByProductIdAndDeleteFlag(request.getProductId(),
                    Constant.DELETE_FLAG_ZERO);
            if (CheckLogic.isNull(product)) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRODUCT_NOT_FOUND_MESSAGE));
            }
            // check EXISTS CategoryName
//            Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
//                    Constant.DELETE_FLAG_ZERO);
//            if (CheckLogic.isNotNull(category) && !category.getCategoryId().equals(request.getCategoryId())) {
//                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
//            }
        }
        return errors;
    }

    /**
     * validateImages
     * 
     * @param images
     */
    private void validateImages(List<MultipartFile> images) {
        List<ValidationErrorItem> errors = new ArrayList<>();

        if (images == null || images.isEmpty()) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.IMAGE_NOT_NULL_MESSAGE));
        }

        for (MultipartFile file : images) {
            if (file.isEmpty()) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.FILE_NOT_FOUND_MESSAGE));
            }
            if (file.getSize() > MAX_FILE_SIZE) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.FILE_SIZE_EXCEEDED_MESSAGE));
            }
            String contentType = file.getContentType();
            if (!("image/jpeg".equals(contentType)) && !("image/png".equals(contentType))) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.FILE_TYPE_NOT_SUPPORTED_MESSAGE));
            }
        }

        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }
    }

    /**
     * checkValidateInit
     * 
     * @param request
     * @return List<ValidationErrorItem>
     */
    public List<ValidationErrorItem> checkValidateInit(ProductInitialApplicationModel request, String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
        }
        // case update
        if (Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE.equals(requestType)) {
            // check NULL CategoryId
            if (!CheckLogic.isValidId(request.getProductId())) {
                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.PRODUCT_NOT_FOUND_MESSAGE));
            }
        }
        return errors;
    }
}
