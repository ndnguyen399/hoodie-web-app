/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Order;

/**
 * OrderRepository class
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
