/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Cart;
import com.hoodie.app.repository.custom.CartSearchRepositoryCustom;

/**
 * CartRepository class
 */
public interface CartRepository extends JpaRepository<Cart, Integer>, CartSearchRepositoryCustom {
    Cart findByUserIdAndDeleteFlag(Long userId, String deleteFlag);
}
