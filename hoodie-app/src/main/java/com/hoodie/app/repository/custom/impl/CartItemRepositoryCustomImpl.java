/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static org.jooq.impl.DSL.sum; // Quan trọng: Đây là nơi chứa hàm sum()
import static com.app.jooq.generated.tables.CartItems.CART_ITEMS;
import static com.app.jooq.generated.tables.Products.PRODUCTS;

import java.math.BigDecimal;
import java.util.List;

import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.repository.custom.CartItemRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * CartItemRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class CartItemRepositoryCustomImpl implements CartItemRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.CartItems
     */
    private static final com.app.jooq.generated.tables.CartItems CI = CART_ITEMS.as("ci");

    /**
     * com.app.jooq.generated.tables.Products
     */
    private static final com.app.jooq.generated.tables.Products P = PRODUCTS.as("p");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * calculateTotalAmount
     */
    @Override
    public BigDecimal calculateTotalAmount(List<Integer> cartItemIds) {
        if (cartItemIds == null || cartItemIds.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal total = dsl.select(sum(CI.QUANTITY.mul(P.PRICE))).from(CI).join(P).on(CI.PRODUCT_ID.eq(P.PRODUCT_ID))
                .where(CI.PRODUCT_ID.in(cartItemIds)).and(CI.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG))
                .fetchOneInto(BigDecimal.class);

        return total != null ? total : BigDecimal.ZERO;
    }

}
