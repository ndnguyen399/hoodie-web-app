/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.CartItem;

/**
 * CartItemRepository class
 */
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartIdAndProductIdAndDeleteFlag(Integer cartId, Integer productId, String deleteFlag);

    CartItem findByCartItemIdAndDeleteFlag(Integer cartItemId, String deleteFlag);
}
