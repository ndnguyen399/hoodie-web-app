/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.hoodie.app.application.model.ProductInitialApplicationModel;
import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.application.model.ProductSubmitApplicationModel;
import com.hoodie.app.entity.Product;

/**
 * ProductMapper class
 */
@Mapper(componentModel = "spring")
public interface ProductMapper {
    /**
     * map initial
     * 
     * @param request
     * @return
     */
    ProductSearchApplicationModel map(ProductInitialApplicationModel request);

    /**
     * updateEntity
     * 
     * @param request
     * @param Product
     */
    @Mapping(target = "productId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntity(ProductSubmitApplicationModel request, @MappingTarget Product product);

//    /**
//     * deleteEntity
//     * 
//     * @param request
//     * @param Product
//     */
//    @Mapping(target = "productId", ignore = true)
//    @Mapping(target = "createdAt", ignore = true)
//    @Mapping(target = "updatedAt", ignore = true)
//    void deleteEntity(ProductSubmitDeleteApplicationModel request, @MappingTarget Category product);
}
