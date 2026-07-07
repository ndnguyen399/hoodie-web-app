/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.CartItems.CART_ITEMS;
import static com.app.jooq.generated.tables.Carts.CARTS;
import static com.app.jooq.generated.tables.ProductImages.PRODUCT_IMAGES;
import static com.app.jooq.generated.tables.Products.PRODUCTS;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.application.model.CartSearchApplicationModel;
import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.custom.CartSearchRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * CartSearchRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class CartSearchRepositoryCustomImpl implements CartSearchRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.Carts
     */
    private static final com.app.jooq.generated.tables.Carts C = CARTS.as("c");

    /**
     * com.app.jooq.generated.tables.CartItems
     */
    private static final com.app.jooq.generated.tables.CartItems CI = CART_ITEMS.as("ci");

    /**
     * com.app.jooq.generated.tables.Products
     */
    private static final com.app.jooq.generated.tables.Products P = PRODUCTS.as("p");

    /**
     * com.app.jooq.generated.tables.ProductImages
     */
    private static final com.app.jooq.generated.tables.ProductImages PI = PRODUCT_IMAGES.as("pi");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * search
     * 
     * @param request {@link CartSearchApplicationModel}
     * @return {@link SearchResponse<CartSearchDomainModel>}
     */
    @Override
    public SearchResponse<CartSearchDomainModel> search(Long userId) {
        return new SearchResponse<>(getCountData(userId), getSearchData(userId));
    }

    /**
     * getCountData
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @return {@link }
     */
    public long getCountData(Long userId) {
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(userId)) {
            conditions.add(C.USER_ID.eq(userId.intValue()));
        }

        conditions.add(C.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
        conditions.add(CI.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
        conditions.add(P.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
        conditions.add(PI.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return dsl.selectCount().from(C).join(CI).on(CI.CART_ID.eq(C.CART_ID)).join(P)
                .on(P.PRODUCT_ID.eq(CI.PRODUCT_ID)).leftJoin(PI)
                .on(PI.PRODUCT_ID.eq(P.PRODUCT_ID).and(PI.IS_PRIMARY.eq(true))).where(conditions)
                .fetchOneInto(Long.class);
    }

    /**
     * getSearchData
     * 
     * @return {@link List<CartSearchDomainModel>}
     */
    public List<CartSearchDomainModel> getSearchData(Long userId) {
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(userId)) {
            conditions.add(C.USER_ID.eq(userId.intValue()));
        }

        conditions.add(C.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return dsl
                .select(CI.CART_ITEM_ID, P.PRODUCT_ID, P.PRODUCT_NAME, P.PRODUCT_DESCRIPTION, P.PRICE, P.STOCK_QUANTITY,
                        PI.IMAGE_URL, CI.QUANTITY)
                .from(C).innerJoin(CI).on(CI.CART_ID.eq(C.CART_ID)).and(CI.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG))
                .innerJoin(P).on(P.PRODUCT_ID.eq(CI.PRODUCT_ID)).and(P.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)).leftJoin(PI)
                .on(PI.PRODUCT_ID.eq(P.PRODUCT_ID)).and(PI.IS_PRIMARY.eq(true))
                .and(PI.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)).where(conditions).orderBy(CI.CREATED_AT.desc())
                .fetchInto(CartSearchDomainModel.class);
    }
}
