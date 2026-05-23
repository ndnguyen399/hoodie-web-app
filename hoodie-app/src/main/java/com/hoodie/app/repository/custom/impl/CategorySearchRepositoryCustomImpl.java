/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.Categories.CATEGORIES;
import static com.app.jooq.generated.tables.CodeMaster.CODE_MASTER;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.domain.model.CategorySearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.custom.CategorySearchRepositoryCustom;

import lombok.RequiredArgsConstructor;

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
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster C1 = CODE_MASTER.as("c1");

    /**
     * com.app.jooq.generated.tables.CodeMaster
     */
    private static final com.app.jooq.generated.tables.CodeMaster C2 = CODE_MASTER.as("c2");

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
        List<Condition> conditions = new ArrayList<>();

        if (!StringUtils.isEmpty(request.getCategoryId())) {
            conditions.add(T.CATEGORY_ID.eq(request.getCategoryId()));
        }

        if (!StringUtils.isEmpty(request.getCategoryName())) {
            String likePattern = "%" + request.getCategoryName() + "%";
            conditions.add(
                    T.CATEGORY_NAME.likeIgnoreCase(likePattern).or(T.CATEGORY_DESCRIPTION.likeIgnoreCase(likePattern)));
        }

        if (!StringUtils.isEmpty(request.getSkillType())) {
            conditions.add(T.SKILL_TYPE.eq(request.getSkillType()));
        }

        if (!StringUtils.isEmpty(request.getAgeGroup())) {
            conditions.add(T.AGE_GROUP.eq(request.getAgeGroup()));
        }

        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

//        return dsl
//                .select(DSL.countDistinct(T.CATEGORY_ID)).from(T).innerJoin(subqueryE).on(eCategoryId.eq(T.CATEGORY_ID)
//                        .and(eHistoryNo.eq(T.CATEGORY_HISTORY_NO)).and(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)))
//                .where(conditions).fetchOne().into(Long.class);
        return dsl.select(DSL.countDistinct(T.CATEGORY_ID)).from(T).where(conditions).fetchOne().into(Long.class);
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
        List<Condition> conditions = new ArrayList<>();

        if (!StringUtils.isEmpty(request.getCategoryId())) {
            conditions.add(T.CATEGORY_ID.eq(request.getCategoryId()));
        }

        if (!StringUtils.isEmpty(request.getCategoryName())) {
            String likePattern = "%" + request.getCategoryName() + "%";
            conditions.add(
                    T.CATEGORY_NAME.likeIgnoreCase(likePattern).or(T.CATEGORY_DESCRIPTION.likeIgnoreCase(likePattern)));
        }

        if (!StringUtils.isEmpty(request.getSkillType())) {
            conditions.add(T.SKILL_TYPE.eq(request.getSkillType()));
        }

        if (!StringUtils.isEmpty(request.getAgeGroup())) {
            conditions.add(T.AGE_GROUP.eq(request.getAgeGroup()));
        }

        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));
//
//        return dsl
//                .select(T.CATEGORY_ID, T.CATEGORY_HISTORY_NO, T.CATEGORY_NAME, T.CATEGORY_DESCRIPTION, T.DELETE_FLAG,
//                        T.CREATED_AT, T.UPDATED_AT)
//                .from(T).innerJoin(subqueryE)
//                .on(eCategoryId.eq(T.CATEGORY_ID).and(eHistoryNo.eq(T.CATEGORY_HISTORY_NO))
//                        .and(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)))
//                .where(conditions).fetchInto(CategorySearchDomainModel.class);
        return dsl
                .select(T.CATEGORY_ID, T.CATEGORY_NAME, T.SKILL_TYPE, C1.CODE_VALUE.as("skillTypeName"), T.AGE_GROUP,
                        C2.CODE_VALUE.as("ageGroupName"), T.CATEGORY_DESCRIPTION, T.RESERVE_ITEM01, T.RESERVE_ITEM02,
                        T.RESERVE_ITEM03, T.RESERVE_ITEM04, T.RESERVE_ITEM05, T.DELETE_FLAG, T.CREATED_AT, T.UPDATED_AT)
                .from(T).leftJoin(C1).on(T.SKILL_TYPE.eq(C1.CODE_NAME)).leftJoin(C2).on(T.AGE_GROUP.eq(C2.CODE_NAME))
                .where(conditions).fetchInto(CategorySearchDomainModel.class);
    }
}
