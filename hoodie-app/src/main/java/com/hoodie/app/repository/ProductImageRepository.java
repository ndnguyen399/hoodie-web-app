/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.ProductImage;

/**
 * ProductImageRepository class
 */
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

}
