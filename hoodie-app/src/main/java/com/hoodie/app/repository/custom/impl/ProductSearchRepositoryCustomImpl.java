/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.CodeMaster.CODE_MASTER;
import static com.app.jooq.generated.tables.Categories.CATEGORIES;
import static com.app.jooq.generated.tables.Products.PRODUCTS;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.ConditionResult;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.custom.ProductSearchRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * ProductSearchRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class ProductSearchRepositoryCustomImpl implements ProductSearchRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.Products
     */
    private static final com.app.jooq.generated.tables.Products T1 = PRODUCTS.as("t1");

    /**
     * com.app.jooq.generated.tables.Categories
     */
    private static final com.app.jooq.generated.tables.Categories T2 = CATEGORIES.as("t2");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster T3 = CODE_MASTER.as("t3");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster T4 = CODE_MASTER.as("t4");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster T5 = CODE_MASTER.as("t5");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster T6 = CODE_MASTER.as("t6");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster T7 = CODE_MASTER.as("t7");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * Query SQL search all product
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link SearchResponse<ProductSearchDomainModel>}
     */
    @Override
    public SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request) {
        // conditions
        List<Condition> conditions = buildConditions(request);

        // search data
        List<ProductSearchDomainModel> data = getSearchData(request, conditions);

        // count data
        long total = getCountData(request, conditions);

        return new SearchResponse<>(total, data);
    }

    // ================ Private helper methods ================

    /**
     * buildConditions
     * 
     * @param request
     * @return {@link ConditionResult}
     */
    private List<Condition> buildConditions(ProductSearchApplicationModel request) {
        List<Condition> conditions = new ArrayList<>();

        // getProductId
        if (CheckLogic.isValidId(request.getProductId())) {
            conditions.add(T1.PRODUCT_ID.eq(request.getProductId()));
        }

        // getCategoryId
        if (CheckLogic.isValidId(request.getCategoryId())) {
            conditions.add(T1.CATEGORY_ID.eq(request.getCategoryId()));
        }

        // getProductName
        if (CheckLogic.isNotEmpty(request.getProductName())) {
            String likePattern = "%" + request.getProductName() + "%";
            conditions.add(
                    T1.PRODUCT_NAME.likeIgnoreCase(likePattern).or(T1.PRODUCT_DESCRIPTION.likeIgnoreCase(likePattern)));
        }

        conditions.add(T1.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return conditions;
    }

    /**
     * getSearchData
     * 
     * @param request    {@link ProductSearchApplicationModel}
     * @param conditions {@link List<Condition>}
     * 
     * @return {@link List<ProductSearchDomainModel>}
     */
    private List<ProductSearchDomainModel> getSearchData(ProductSearchApplicationModel request,
            List<Condition> conditions) {
        return dsl
                .select(T1.PRODUCT_ID, T1.CATEGORY_ID, T2.CATEGORY_NAME, T1.PRODUCT_NAME, T1.PRODUCT_DESCRIPTION, T1.PRICE,
                        T1.STOCK_QUANTITY, T1.SKILL_LOGIC, T3.CODE_VALUE.as("skillLogicName"), T1.SKILL_CREATIVE,
                        T4.CODE_VALUE.as("skillCreativeName"), T1.SKILL_STEM, T5.CODE_VALUE.as("skillStemName"),
                        T1.SKILL_MOTOR, T6.CODE_VALUE.as("skillMotorName"), T1.SKILL_SOCIAL,
                        T7.CODE_VALUE.as("skillSocialName"), T1.RESERVE_ITEM01, T1.RESERVE_ITEM02, T1.RESERVE_ITEM03,
                        T1.RESERVE_ITEM04, T1.RESERVE_ITEM05, T1.DELETE_FLAG, T1.CREATED_AT, T1.UPDATED_AT)
                .from(T1).leftJoin(T2).on(T1.CATEGORY_ID.eq(T2.CATEGORY_ID)).leftJoin(T3)
                .on(T1.SKILL_LOGIC.eq(T3.CODE_NAME).and(T3.CODE_CD.eq(Constant.HOODIE_CODE_000113))).leftJoin(T4)
                .on(T1.SKILL_CREATIVE.eq(T4.CODE_NAME).and(T4.CODE_CD.eq(Constant.HOODIE_CODE_000113))).leftJoin(T5)
                .on(T1.SKILL_STEM.eq(T5.CODE_NAME).and(T5.CODE_CD.eq(Constant.HOODIE_CODE_000113))).leftJoin(T6)
                .on(T1.SKILL_SOCIAL.eq(T6.CODE_NAME).and(T6.CODE_CD.eq(Constant.HOODIE_CODE_000113))).leftJoin(T7)
                .on(T1.SKILL_SOCIAL.eq(T7.CODE_NAME).and(T7.CODE_CD.eq(Constant.HOODIE_CODE_000113))).where(conditions)
                .fetchInto(ProductSearchDomainModel.class);
    }

    /**
     * getCountData
     * 
     * @param request    {@link ProductSearchApplicationModel}
     * @param conditions {@link List<Condition>}
     * @return {@link }
     */
    public long getCountData(ProductSearchApplicationModel request, List<Condition> conditions) {
        return dsl.select(DSL.countDistinct(T1.PRODUCT_ID)).from(T1).where(conditions).fetchOne().into(Long.class);
    }
}
