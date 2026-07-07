/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CartSubmitApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.error.ValidationErrorItem;
import com.hoodie.app.entity.Cart;
import com.hoodie.app.entity.CartItem;
import com.hoodie.app.entity.User;
import com.hoodie.app.exception.BusinessValidationException;
import com.hoodie.app.repository.CartItemRepository;
import com.hoodie.app.repository.CartRepository;
import com.hoodie.app.service.CartService;

import lombok.RequiredArgsConstructor;

/**
 * CartServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    /**
     * CartRepository
     */
    @Autowired
    private CartRepository cartRepository;

    /**
     * CartItemRepository
     */
    @Autowired
    private CartItemRepository cartItemRepository;

    /**
     * submitCart
     * 
     * @param request
     * @return SubmitResponseModel
     */
    @Override
    public SubmitResponseModel submitCart(User currentUser, SubmitRequestModel<CartSubmitApplicationModel> request) {
        // check validate
        List<ValidationErrorItem> errors = this.checkValidate(currentUser, request.getModel(),
                request.getRequestType());
        if (!errors.isEmpty()) {
            throw new BusinessValidationException(errors);
        }

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
    private SubmitResponseModel create(User currentUser, CartSubmitApplicationModel request) {
        // get cart
        Cart cart = cartRepository.findByUserIdAndDeleteFlag(currentUser.getUserId(), Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isNotNull(cart)) {
            // insert product to cart item
            CartItem cartItem = cartItemRepository.findByCartIdAndProductIdAndDeleteFlag(cart.getCartId(),
                    request.getProductId(), Constant.DELETE_FLAG_ZERO);

            // cart item is present
            if (CheckLogic.isNotNull(cartItem)) {
                CartItem item = cartItem;
                cartItem.setQuantity(item.getQuantity() + request.getQuantity());
            } else {
                cartItem = new CartItem();
                cartItem.setCartId(cart.getCartId());
                cartItem.setProductId(request.getProductId());
                cartItem.setQuantity(request.getQuantity());
                cartItem.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
            }
            cartItemRepository.save(cartItem);
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
    public List<ValidationErrorItem> checkValidate(User currentUser, CartSubmitApplicationModel request,
            String requestType) {
        List<ValidationErrorItem> errors = new ArrayList<>();
        // check NULL requestType
        if (CheckLogic.isEmpty(requestType)) {
            errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.REQUEST_TYPE_NOT_BLANK));
            return errors;
        }
        // case update
        if (CheckLogic.isSubmitEntry(requestType)) {
            // check EXISTS CategoryName
//            Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
//                    Constant.DELETE_FLAG_ZERO);
//            if (CheckLogic.isNotNull(category)) {
//                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
//            }
        } else {
            // check NULL CategoryId
//            if (!CheckLogic.isValidId(request.getCategoryId())) {
//                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
//            }
//            // check EXISTS CategoryId
//            Category categoryId = categoryRepository.findByCategoryIdAndDeleteFlag(request.getCategoryId(),
//                    Constant.DELETE_FLAG_ZERO);
//            if (CheckLogic.isNull(categoryId)) {
//                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_NOT_FOUND_MESSAGE));
//            }
//            // check EXISTS CategoryName
//            Category category = categoryRepository.findByCategoryNameAndDeleteFlag(request.getCategoryName(),
//                    Constant.DELETE_FLAG_ZERO);
//            if (CheckLogic.isNotNull(category) && !category.getCategoryId().equals(request.getCategoryId())) {
//                errors.add(new ValidationErrorItem(Constant.ERROR_VALIDATE, Constant.CATEGORY_ALREADY_EXISTS_MESSAGE));
//            }
        }
        // get cart
        Cart cart = cartRepository.findByUserIdAndDeleteFlag(currentUser.getUserId(), Constant.DELETE_FLAG_ZERO);
        if (CheckLogic.isNull(cart)) {
            cart = new Cart();
            cart.setUserId(currentUser.getUserId());
            cart.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
            cartRepository.save(cart);
        }
        return errors;
    }
}
