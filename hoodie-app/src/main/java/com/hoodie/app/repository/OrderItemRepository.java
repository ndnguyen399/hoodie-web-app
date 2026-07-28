/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.OrderItem;

/**
 * OrderItemRepository class
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findByOrderIdAndDeleteFlag(Integer orderId, String deleteFlag);

    List<OrderItem> findByOrderIdInAndDeleteFlag(List<Integer> orderIds, String deleteFlag);
}
