/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.OrderSearchApplicationModel;
import com.hoodie.app.domain.model.OrderSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.OrderItemRepository;
import com.hoodie.app.repository.OrderRepository;
import com.hoodie.app.repository.ProductRepository;
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
    private UserAddressRepository addressRepository;

    @Override
    public SearchResponse<OrderSearchDomainModel> search(User currentUser, OrderSearchApplicationModel request) {
        return null;
    }
}
