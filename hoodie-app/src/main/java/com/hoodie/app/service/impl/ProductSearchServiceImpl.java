/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.ProductImageSearchDomainModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.ProductImage;
import com.hoodie.app.mapper.ProductImageMapper;
import com.hoodie.app.repository.ProductImageRepository;
import com.hoodie.app.repository.ProductRepository;
import com.hoodie.app.service.ProductSearchService;

import lombok.RequiredArgsConstructor;

/**
 * ProductSearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class ProductSearchServiceImpl implements ProductSearchService {

    /**
     * ProductRepository
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * ProductImageRepository
     */
    @Autowired
    private ProductImageRepository productImageRepository;

    /**
     * ProductImageMapper
     */
    @Autowired
    private ProductImageMapper productImageMapper;

    /**
     * search
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link SearchResponse<ProductSearchDomainModel>}
     */
    @Override
    public SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request) {
        // get data
        SearchResponse<ProductSearchDomainModel> resultObject = productRepository.search(request);
        // get ProductIds
        List<Integer> productIds = resultObject.getSearch().stream().map(ProductSearchDomainModel::getProductId)
                .toList();

        // get Images
        List<ProductImage> images = productImageRepository.findByProductIdInAndDeleteFlag(productIds,
                Constant.DELETE_FLAG_ZERO);

        // group
        Map<Integer, List<ProductImageSearchDomainModel>> imageMap = images.stream().map(productImageMapper::map)
                .collect(Collectors.groupingBy(ProductImageSearchDomainModel::getProductId));

        // set product
        resultObject.getSearch().forEach(product -> product
                .setListImages(imageMap.getOrDefault(product.getProductId(), Collections.emptyList())));
        return resultObject;
    }

}
