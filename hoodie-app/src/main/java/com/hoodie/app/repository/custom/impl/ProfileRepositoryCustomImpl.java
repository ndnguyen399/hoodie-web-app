/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.UserAddresses.USER_ADDRESSES;
import static com.app.jooq.generated.tables.Users.USERS;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.application.model.ProfileInitialApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.domain.model.ProfileDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.custom.ProfileRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * ProfileRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class ProfileRepositoryCustomImpl implements ProfileRepositoryCustom {
    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.Users
     */
    private static final com.app.jooq.generated.tables.Users T = USERS.as("t");

    /**
     * com.app.jooq.generated.tables.UserAddresses
     */
    private static final com.app.jooq.generated.tables.UserAddresses T2 = USER_ADDRESSES.as("t2");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * search
     * 
     * @param request {@link ProfileInitialApplicationModel}
     * @return {@link SearchResponse<ProfileDomainModel>}
     */
    @Override
    public SearchResponse<ProfileDomainModel> search(User currentUser, ProfileInitialApplicationModel request) {
        return new SearchResponse<>(getCountData(currentUser, request), getSearchData(currentUser, request));
    }

    /**
     * getCountData
     * 
     * @param request {@link ProfileInitialApplicationModel}
     * @return {@link long}
     */
    public long getCountData(User currentUser, ProfileInitialApplicationModel request) {
//        Field<Integer> maxHistoryNo = CATEGORIES.CATEGORY_HISTORY_NO.max().as("category_history_no");
//
//        Table<?> subqueryE = dsl.select(CATEGORIES.CATEGORY_ID, maxHistoryNo).from(CATEGORIES)
//                .groupBy(CATEGORIES.CATEGORY_ID).asTable("e"); // as name is 'e'
//
//        Field<Integer> eCategoryId = subqueryE.field(CATEGORIES.CATEGORY_ID);
//        Field<Integer> eHistoryNo = subqueryE.field(maxHistoryNo);
//
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(currentUser.getUserId())) {
            conditions.add(T.USER_ID.eq(currentUser.getUserId().intValue()));
        }
        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

//        return dsl
//                .select(DSL.countDistinct(T.CATEGORY_ID)).from(T).innerJoin(subqueryE).on(eCategoryId.eq(T.CATEGORY_ID)
//                        .and(eHistoryNo.eq(T.CATEGORY_HISTORY_NO)).and(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG)))
//                .where(conditions).fetchOne().into(Long.class);
        return dsl.select(DSL.countDistinct(T.USER_ID)).from(T).where(conditions).fetchOne().into(Long.class);
    }

    /**
     * getSearchData
     * 
     * @return {@link List<ProfileDomainModel>}
     */
    public List<ProfileDomainModel> getSearchData(User currentUser, ProfileInitialApplicationModel request) {
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(currentUser.getUserId())) {
            conditions.add(T.USER_ID.eq(currentUser.getUserId().intValue()));
        }
        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return dsl
                .select(T.USER_ID, T.FULL_NAME, T.EMAIL, T.PHONE, T.AVATAR_URL, T.BIRTH_DATE, T.GENDER, T.NOTE,
                        T.RESERVE_ITEM01, T.RESERVE_ITEM02, T.RESERVE_ITEM03, T.RESERVE_ITEM04, T.RESERVE_ITEM05,
                        T.DELETE_FLAG, T.CREATED_AT, T.UPDATED_AT)
                .from(T).where(conditions).fetchInto(ProfileDomainModel.class);
    }
}
