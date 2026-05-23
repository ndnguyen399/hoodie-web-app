/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CodeSearchApplicationModel;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.CodeSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.CodeRepository;
import com.hoodie.app.service.CodeService;

import lombok.RequiredArgsConstructor;

/**
 * CodeServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CodeServiceImpl implements CodeService {

    /**
     * CodeRepository
     */
    @Autowired
    private CodeRepository codeRepository;

    /**
     * search
     * 
     * @param request
     * @return SearchResponse<CodeSearchDomainModel>
     */
    @Override
    public SearchResponse<CodeSearchDomainModel> search(CodeSearchApplicationModel request) {

        List<CodeSearchDomainModel> list = codeRepository.findByCodeCdAndDeleteFlag(request.getCodeCd(),
                Constant.DELETE_FLAG_ZERO);
        long total = codeRepository.countByCodeCdAndDeleteFlag(request.getCodeCd(), Constant.DELETE_FLAG_ZERO);

        SearchResponse<CodeSearchDomainModel> result = new SearchResponse<CodeSearchDomainModel>(total, list);
        return result;
    }

}
