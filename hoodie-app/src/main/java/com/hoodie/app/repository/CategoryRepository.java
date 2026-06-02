/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hoodie.app.entity.Category;
import com.hoodie.app.repository.custom.CategorySearchRepositoryCustom;

/**
 * CategoryRepository class
 */
public interface CategoryRepository extends JpaRepository<Category, Integer>, CategorySearchRepositoryCustom {
    Category findByCategoryIdAndDeleteFlag(Integer categoryId, String deleteFlag);
    Category findByCategoryNameAndDeleteFlag(String categoryName, String deleteFlag);
}
