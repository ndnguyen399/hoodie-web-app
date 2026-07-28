/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Order;

/**
 * OrderRepository class
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserIdAndDeleteFlag(Long userId, String deleteFlag);

    List<Order> findByUserIdAndOrderIdAndDeleteFlag(Long userId, Integer orderId, String deleteFlag);
}
