/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.custom.CategorySearchRepositoryCustom;

import lombok.RequiredArgsConstructor;

import static com.app.jooq.generated.tables.Categories.CATEGORIES;

/**
 * CategorySearchRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class CategorySearchRepositoryCustomImpl implements CategorySearchRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.Categories
     */
    private static final com.app.jooq.generated.tables.Categories T = CATEGORIES.as("t");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * search
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @return {@link SearchResponse<CategorySearchDomainModel>}
     */
    @Override
    public SearchResponse<CategorySearchDomainModel> search(CategorySearchApplicationModel request) {
        return new SearchResponse<>(getCountData(request), getSearchData(request));
    }

    /**
     * getCountData
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @return {@link }
     */
    public long getCountData(CategorySearchApplicationModel request) {
//        Field<Integer> maxHistoryNo = CATEGORIES.CATEGORY_HISTORY_NO.max().as("category_history_no");
//
//        Table<?> subqueryE = dsl.select(CATEGORIES.CATEGORY_ID, maxHistoryNo).from(CATEGORIES)
//                .groupBy(CATEGORIES.CATEGORY_ID).asTable("e"); // as name is 'e'
//
//        Field<Integer> eCategoryId = subqueryE.field(CATEGORIES.CATEGORY_ID);
//        Field<Integer> eHistoryNo = subqueryE.field(maxHistoryNo);
//
//        List<Condition> conditions = new ArrayList<>();
//
//        if (!StringUtils.isEmpty(request.getCategoryId())) {
//            conditions.add(T.CATEGORY_ID.eq(request.getCategoryId()));
//        }
//        if (!StringUtils.isEmpty(request.getCategoryName())) {
//            String likePattern = "%" + request.getCategoryName() + "%";
//            conditions.add(
//                    T.CATEGORY_NAME.likeIgnoreCase(likePattern).or(T.CATEGORY_DESCRIPTION.likeIgnoreCase(likePattern)));
//        }
//        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
//
//        return dsl
//                .select(DSL.countDistinct(T.CATEGORY_ID)).from(T).innerJoin(subqueryE).on(eCategoryId.eq(T.CATEGORY_ID)
//                        .and(eHistoryNo.eq(T.CATEGORY_HISTORY_NO)).and(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)))
//                .where(conditions).fetchOne().into(Long.class);
        return dsl.select(DSL.countDistinct(T.CATEGORY_ID)).from(T).fetchOne().into(Long.class);
    }

    /**
     * getSearchData
     * 
     * @return {@link List<CategorySearchDomainModel>}
     */
    public List<CategorySearchDomainModel> getSearchData(CategorySearchApplicationModel request) {
//        Field<Integer> maxHistoryNo = CATEGORIES.CATEGORY_HISTORY_NO.max().as("category_history_no");
//
//        Table<?> subqueryE = dsl.select(CATEGORIES.CATEGORY_ID, maxHistoryNo).from(CATEGORIES)
//                .groupBy(CATEGORIES.CATEGORY_ID).asTable("e"); // as name is 'e'
//
//        Field<Integer> eCategoryId = subqueryE.field(CATEGORIES.CATEGORY_ID);
//        Field<Integer> eHistoryNo = subqueryE.field(maxHistoryNo);
//
//        List<Condition> conditions = new ArrayList<>();
//
//        if (!StringUtils.isEmpty(request.getCategoryId())) {
//            conditions.add(T.CATEGORY_ID.eq(request.getCategoryId()));
//        }
//        if (!StringUtils.isEmpty(request.getCategoryName())) {
//            String likePattern = "%" + request.getCategoryName() + "%";
//            conditions.add(
//                    T.CATEGORY_NAME.likeIgnoreCase(likePattern).or(T.CATEGORY_DESCRIPTION.likeIgnoreCase(likePattern)));
//        }
//        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
//
//        return dsl
//                .select(T.CATEGORY_ID, T.CATEGORY_HISTORY_NO, T.CATEGORY_NAME, T.CATEGORY_DESCRIPTION, T.DELETE_FLAG,
//                        T.CREATED_AT, T.UPDATED_AT)
//                .from(T).innerJoin(subqueryE)
//                .on(eCategoryId.eq(T.CATEGORY_ID).and(eHistoryNo.eq(T.CATEGORY_HISTORY_NO))
//                        .and(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)))
//                .where(conditions).fetchInto(CategorySearchDomainModel.class);
        return dsl.select(T.CATEGORY_ID, T.CATEGORY_NAME, T.CATEGORY_DESCRIPTION, T.DELETE_FLAG, T.CREATED_AT,
                T.UPDATED_AT).from(T).fetchInto(CategorySearchDomainModel.class);
    }
}
