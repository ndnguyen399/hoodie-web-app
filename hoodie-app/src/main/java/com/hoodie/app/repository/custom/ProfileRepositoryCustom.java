/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom;

import com.hoodie.app.application.model.ProfileInitialApplicationModel;
import com.hoodie.app.domain.model.ProfileDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;

/**
 * ProfileRepositoryCustom class
 */
public interface ProfileRepositoryCustom {
    SearchResponse<ProfileDomainModel> search(User currentUser, ProfileInitialApplicationModel request);
}
