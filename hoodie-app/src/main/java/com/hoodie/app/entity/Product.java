/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.entity;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Product class
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "product_name", nullable = false, length = 255)
    private String productName;

    @Column(name = "product_description", length = 255)
    private String productDescription;

    @Column(name = "price", nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false, length = 2)
    private Integer stockQuantity;

    @Column(name = "skill_logic", nullable = false, length = 2)
    private String skillLogic;

    @Column(name = "skill_creative", nullable = false, length = 2)
    private String skillCreative;

    @Column(name = "skill_stem", nullable = false, length = 2)
    private String skillStem;

    @Column(name = "skill_motor", nullable = false, length = 2)
    private String skillMotor;

    @Column(name = "skill_social", nullable = false, length = 2)
    private String skillSocial;

    @Column(name = "reserve_item01", length = 255)
    private String reserveItem01;

    @Column(name = "reserve_item02", length = 255)
    private String reserveItem02;

    @Column(name = "reserve_item03", length = 255)
    private String reserveItem03;

    @Column(name = "reserve_item04", length = 255)
    private String reserveItem04;

    @Column(name = "reserve_item05", length = 255)
    private String reserveItem05;

    @Column(name = "delete_flag", nullable = false, length = 1)
    private String deleteFlag;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime updatedAt;
}
