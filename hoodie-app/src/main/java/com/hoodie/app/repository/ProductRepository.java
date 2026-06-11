/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Product;
import com.hoodie.app.repository.custom.ProductSearchRepositoryCustom;

/**
 * ProductRepository class
 */
public interface ProductRepository extends JpaRepository<Product, Integer>, ProductSearchRepositoryCustom {
    Product findByProductNameAndDeleteFlag(String productName, String deleteFlag);
}
