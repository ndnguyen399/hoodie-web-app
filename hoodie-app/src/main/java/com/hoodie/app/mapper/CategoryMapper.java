/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.entity.Category;

/**
 * CategoryMapper class
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper {
    // Map from request → entity
    Category map(CategorySubmitApplicationModel request);

    // Map from entity → response
//    CategorySubmitApplicationModel toModel(Category category);

    // Dùng cho update: map vào entity đã có sẵn, giữ lại các field không được map
    @Mapping(target = "categoryId", ignore = true) 
    @Mapping(target = "createdAt", ignore = true)
    void updateEntity(CategorySubmitApplicationModel request, @MappingTarget Category category);
}
