/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.OrderSearchApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.constant.Role;
import com.hoodie.app.domain.model.OrderItemSearchDomainModel;
import com.hoodie.app.domain.model.OrderSearchDomainModel;
import com.hoodie.app.domain.model.PaymentSearchDomainModel;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.SubmitResponseModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.Order;
import com.hoodie.app.entity.OrderItem;
import com.hoodie.app.entity.Payment;
import com.hoodie.app.entity.User;
import com.hoodie.app.entity.UserAddress;
import com.hoodie.app.repository.OrderItemRepository;
import com.hoodie.app.repository.OrderRepository;
import com.hoodie.app.repository.PaymentRepository;
import com.hoodie.app.repository.UserAddressRepository;
import com.hoodie.app.service.OrderSearchService;

import lombok.RequiredArgsConstructor;

/**
 * OrderSearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class OrderSearchServiceImpl implements OrderSearchService {

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
     * UserAddressRepository
     */
    @Autowired
    private UserAddressRepository userAddressRepository;

    /**
     * PaymentRepository
     */
    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * search
     */
    @Override
    public SearchResponse<OrderSearchDomainModel> search(User currentUser, OrderSearchApplicationModel request) {
        return new SearchResponse<>(0, getMyOrders(currentUser, request));
    }

    /**
     * getMyOrders
     * 
     * @param userId
     * @return List<OrderSearchDomainModel>
     */
    public List<OrderSearchDomainModel> getMyOrders(User currentUser, OrderSearchApplicationModel request) {

        List<Order> orders = new ArrayList<Order>();
        if (currentUser.getRole().equals(Role.ROLE_ADMIN)) {
            orders = orderRepository.findAll();
        } else {
            if (CheckLogic.isValidId(request.getOrderId())) {
                orders = orderRepository.findByUserIdAndOrderIdAndDeleteFlag(currentUser.getUserId(),
                        request.getOrderId(), Constant.DELETE_FLAG_ZERO);
            } else {
                orders = orderRepository.findByUserIdAndDeleteFlag(currentUser.getUserId(), Constant.DELETE_FLAG_ZERO);
            }
        }

        if (orders.isEmpty()) {
            return List.of();
        }
        List<Integer> orderIds = orders.stream().map(Order::getOrderId).toList();
        List<Integer> addressIds = orders.stream().map(Order::getReserveItem02).filter(Objects::nonNull)
                .map(Integer::valueOf).distinct().toList();
        List<OrderItem> items = orderItemRepository.findByOrderIdInAndDeleteFlag(orderIds, Constant.DELETE_FLAG_ZERO);
        List<Payment> payments = paymentRepository.findByOrderIdInAndDeleteFlag(orderIds, Constant.DELETE_FLAG_ZERO);
        List<UserAddress> addresses = addressIds.isEmpty() ? List.of()
                : userAddressRepository.findByAddressIdInAndDeleteFlag(addressIds, Constant.DELETE_FLAG_ZERO);
        Map<Integer, List<OrderItem>> itemMap = items.stream().collect(Collectors.groupingBy(OrderItem::getOrderId));
        Map<Integer, Payment> paymentMap = payments.stream()
                .collect(Collectors.toMap(Payment::getOrderId, Function.identity(), (a, b) -> a));
        Map<Integer, UserAddress> addressMap = addresses.stream()
                .collect(Collectors.toMap(UserAddress::getAddressId, Function.identity()));
        return orders.stream().map(order -> {
            OrderSearchDomainModel response = toResponse(order);
            Payment payment = paymentMap.get(order.getOrderId());
            if (payment != null) {
                response.setPayment(toPayment(payment));
            }
            if (order.getReserveItem02() != null) {
                UserAddress address = addressMap.get(Integer.valueOf(order.getReserveItem02()));
                if (address != null) {
                    response.setAddress(toAddress(address));
                }
            }
            response.setItems(itemMap.getOrDefault(order.getOrderId(), List.of()).stream().map(item -> {
                OrderItemSearchDomainModel dto = toItem(item);
                dto.setTotalPrice(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                return dto;
            }).toList());
            return response;
        }).toList();
    }

    /**
     * toResponse
     * 
     * @param order
     * @return
     */
    public OrderSearchDomainModel toResponse(Order order) {
        if (order == null) {
            return null;
        }
        OrderSearchDomainModel response = new OrderSearchDomainModel();
        response.setOrderId(order.getOrderId());
        response.setSubtotal(order.getSubtotal());
        response.setShippingFee(order.getShippingFee());
        response.setTotalAmount(order.getTotalAmount());
        response.setOrderStatus(order.getOrderStatus());
        response.setNote(order.getNote());
        response.setPromotionCode(order.getReserveItem01());
        response.setCreatedAt(order.getCreatedAt());
        return response;
    }

    /**
     * toItem
     * 
     * @param item
     * @return
     */
    public OrderItemSearchDomainModel toItem(OrderItem item) {
        if (item == null) {
            return null;
        }
        OrderItemSearchDomainModel response = new OrderItemSearchDomainModel();
        response.setProductId(item.getProductId());
        response.setProductName(item.getProductName());
        response.setUnitPrice(item.getUnitPrice());
        response.setQuantity(item.getQuantity());
        response.setTotalPrice(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return response;
    }

    /**
     * toPayment
     * 
     * @param payment
     * @return
     */
    private PaymentSearchDomainModel toPayment(Payment payment) {
        PaymentSearchDomainModel dto = new PaymentSearchDomainModel();
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setAmount(payment.getAmount());
        dto.setGateway(payment.getGateway());
        dto.setTransactionRef(payment.getTransactionRef());
        dto.setPaidAt(payment.getPaidAt());
        return dto;
    }

    /**
     * toAddress
     * 
     * @param address
     * @return
     */
    private UserAddressSearchDomainModel toAddress(UserAddress address) {
        UserAddressSearchDomainModel dto = new UserAddressSearchDomainModel();
        dto.setAddressId(address.getAddressId());
        dto.setRecipientName(address.getRecipientName());
        dto.setPhone(address.getPhone());
        dto.setStreet(address.getStreet());
        dto.setWard(address.getWard());
        dto.setDistrict(address.getDistrict());
        dto.setCity(address.getCity());
        dto.setIsDefault(address.getIsDefault());
        return dto;
    }

    /**
     * deleveryOrder
     */
    @Override
    public SubmitResponseModel deleveryOrder(SubmitRequestModel<OrderSearchApplicationModel> request) {
        Order orders = orderRepository.findByOrderIdAndDeleteFlag(request.getModel().getOrderId(),
                Constant.DELETE_FLAG_ZERO);
        orders.setOrderStatus("delivered");
        orderRepository.save(orders);

        SubmitResponseModel response = new SubmitResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_UPDATE_SUCCESS);
        return response;
    }
}
