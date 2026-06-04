/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.hoodie.app.application.model.CategoryInitialApplicationModel;
import com.hoodie.app.application.model.CategorySearchApplicationModel;
import com.hoodie.app.application.model.CategorySubmitApplicationModel;
import com.hoodie.app.application.model.CategorySubmitDeleteApplicationModel;
import com.hoodie.app.entity.Category;

/**
 * CategoryMapper class
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper {
    /**
     * map create
     * 
     * @param request
     * @return
     */
    Category map(CategorySubmitApplicationModel request);

    /**
     * map initial
     * 
     * @param request
     * @return
     */
    CategorySearchApplicationModel map(CategoryInitialApplicationModel request);

    /**
     * updateEntity
     * 
     * @param request
     * @param category
     */
    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntity(CategorySubmitApplicationModel request, @MappingTarget Category category);

    /**
     * deleteEntity
     * 
     * @param request
     * @param category
     */
    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void deleteEntity(CategorySubmitDeleteApplicationModel request, @MappingTarget Category category);
}
