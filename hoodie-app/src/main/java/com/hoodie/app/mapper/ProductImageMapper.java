/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.mapper;

import org.mapstruct.Mapper;

import com.hoodie.app.domain.model.ProductImageSearchDomainModel;
import com.hoodie.app.entity.ProductImage;

/**
 * ProductImageMapper class
 */
@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImageSearchDomainModel map(ProductImage entity);
}
