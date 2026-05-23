/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import com.hoodie.app.application.model.CodeSearchApplicationModel;
import com.hoodie.app.domain.model.CodeSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;

/**
 * CodeService class
 */
public interface CodeService {
    public SearchResponse<CodeSearchDomainModel> search(CodeSearchApplicationModel request);
}
