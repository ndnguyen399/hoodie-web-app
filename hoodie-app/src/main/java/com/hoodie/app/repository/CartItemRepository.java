/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.CartItem;
import com.hoodie.app.repository.custom.CartItemRepositoryCustom;

/**
 * CartItemRepository class
 */
public interface CartItemRepository extends JpaRepository<CartItem, Integer>, CartItemRepositoryCustom {
    CartItem findByCartIdAndProductIdAndDeleteFlag(Integer cartId, Integer productId, String deleteFlag);

    CartItem findByCartItemIdAndDeleteFlag(Integer cartItemId, String deleteFlag);
}
