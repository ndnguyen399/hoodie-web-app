/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import com.hoodie.app.application.model.UserAddressInitialApplicationModel;
import com.hoodie.app.domain.model.UserAddressSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * UserAddressRepositoryCustom class
 */
public interface UserAddressRepositoryCustom {
    SearchResponse<UserAddressSearchDomainModel> search(User currentUser, UserAddressInitialApplicationModel request);
}
