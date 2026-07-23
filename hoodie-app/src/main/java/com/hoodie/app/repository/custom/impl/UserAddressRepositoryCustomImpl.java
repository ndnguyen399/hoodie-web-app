/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.UserAddresses.USER_ADDRESSES;

import java.util.ArrayList;
import java.util.List;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.application.model.UserAddressInitialApplicationModel;
import com.hoodie.app.common.CheckLogic;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.custom.UserAddressRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * UserAddressRepositoryCustomImpl
 */
@Repository
@RequiredArgsConstructor
public class UserAddressRepositoryCustomImpl implements UserAddressRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.UserAddresses
     */
    private static final com.app.jooq.generated.tables.UserAddresses T = USER_ADDRESSES.as("t");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * search
     */
    @Override
    public SearchResponse<UserAddressSearchDomainModel> search(User currentUser,
            UserAddressInitialApplicationModel request) {
        return new SearchResponse<>(getCountData(currentUser, request), getSearchData(currentUser, request));
    }

    /**
     * getCountData
     * 
     * @param request {@link UserAddressInitialApplicationModel}
     * @return {@link }
     */
    public long getCountData(User currentUser, UserAddressInitialApplicationModel request) {
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(currentUser.getUserId())) {
            conditions.add(T.USER_ID.eq(currentUser.getUserId().intValue()));
        }
        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return dsl.select(DSL.countDistinct(T.ADDRESS_ID)).from(T).where(conditions).fetchOne().into(Long.class);
    }

    /**
     * getSearchData
     * 
     * @return {@link List<UserAddressSearchDomainModel>}
     */
    public List<UserAddressSearchDomainModel> getSearchData(User currentUser,
            UserAddressInitialApplicationModel request) {
        List<Condition> conditions = new ArrayList<>();

        if (CheckLogic.isValidId(currentUser.getUserId())) {
            conditions.add(T.USER_ID.eq(currentUser.getUserId().intValue()));
        }

        conditions.add(T.DELETE_FLAG.eq(DEFAULT_DELETE_FLAG));

        return dsl
                .select(T.ADDRESS_ID, T.RECIPIENT_NAME, T.PHONE, T.STREET, T.WARD, T.DISTRICT, T.CITY, T.IS_DEFAULT,
                        T.RESERVE_ITEM01, T.RESERVE_ITEM02, T.RESERVE_ITEM03, T.RESERVE_ITEM04, T.RESERVE_ITEM05,
                        T.DELETE_FLAG, T.CREATED_AT, T.UPDATED_AT)
                .from(T).where(conditions).fetchInto(UserAddressSearchDomainModel.class);
    }
}
