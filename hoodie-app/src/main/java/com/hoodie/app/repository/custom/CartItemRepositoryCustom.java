/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import java.math.BigDecimal;
import java.util.List;

/**
 * CartItemRepositoryCustom
 */
public interface CartItemRepositoryCustom {
    public BigDecimal calculateTotalAmount(List<Integer> cartItemIds);
}
