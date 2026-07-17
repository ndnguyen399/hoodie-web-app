/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.SubmitPaymentResponseModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.entity.CartItem;
import com.hoodie.app.entity.Order;
import com.hoodie.app.entity.OrderItem;
import com.hoodie.app.entity.Product;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.CartItemRepository;
import com.hoodie.app.repository.OrderItemRepository;
import com.hoodie.app.repository.OrderRepository;
import com.hoodie.app.repository.ProductRepository;
import com.hoodie.app.service.OrderService;

import lombok.RequiredArgsConstructor;

/**
 * OrderServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    /**
     * CartItemRepository
     */
    @Autowired
    private CartItemRepository cartItemRepository;

    /**
     * OrderRepository
     */
    @Autowired
    private OrderRepository orderRepository;

    /**
     * OrderItemRepository
     */
    @Autowired
    private OrderItemRepository orderItemRepository;

    /**
     * ProductRepository
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * submit
     */
    @Override
    public SubmitPaymentResponseModel submit(User currentUser,
            SubmitRequestModel<CheckoutSubmitApplicationModel> request) {
        // check validate
//        List<ValidationErrorItem> errors = this.checkValidate(request.getModel(), request.getRequestType());
//        if (!errors.isEmpty()) {
//            throw new BusinessValidationException(errors);
//        }

        SubmitPaymentResponseModel submitResponseModel = new SubmitPaymentResponseModel();
        // submit create
//        if (CheckLogic.isSubmitEntry(request.getRequestType())) {
        submitResponseModel = create(currentUser, request.getModel());
//        } else {
        // submit update
//            submitResponseModel = update(request.getModel());
//        }

        return submitResponseModel;
    }

    /**
     * create
     * 
     * @param request
     * @return SubmitResponseModel
     */
    private SubmitPaymentResponseModel create(User currentUser, CheckoutSubmitApplicationModel request) {

        // create order
        Order orders = new Order();
        orders.setUserId(currentUser.getUserId());
        BigDecimal subtotal = cartItemRepository.calculateTotalAmount(request.getListId());
        orders.setSubtotal(subtotal);
        orders.setShippingFee(Constant.SHIPPING_FEE);
        orders.setTotalAmount(subtotal.add(orders.getShippingFee()));
        orders.setOrderStatus(Constant.ORDER_STATUS_PENDING);
        if (CheckLogic.isNotEmpty(request.getNote())) {
            orders.setNote(request.getNote());
        }
        orders.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        orderRepository.save(orders);

        // create order item
        List<CartItem> selectedItems = cartItemRepository.findAllById(request.getListId());

        List<OrderItem> orderItems = selectedItems.stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orders.getOrderId()); // Liên kết với order vừa tạo
            orderItem.setProductId(item.getProductId());
            orderItem.setQuantity(item.getQuantity());

            Product product = productRepository.findByProductIdAndDeleteFlag(item.getProductId(),
                    Constant.DELETE_FLAG_ZERO);
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setProductName(product.getProductName());

            orderItem.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
            return orderItem;
        }).collect(Collectors.toList());

        // 2. Lưu danh sách order items
        orderItemRepository.saveAll(orderItems);

        // 3. (Tùy chọn) Xóa các item đã mua khỏi giỏ hàng nếu cần
//        cartItemRepository.deleteAll(selectedItems);

        SubmitPaymentResponseModel response = new SubmitPaymentResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        response.setOrderId(orders.getOrderId());
        return response;
    }

}
