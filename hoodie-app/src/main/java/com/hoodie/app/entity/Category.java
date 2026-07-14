/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.entity;

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
 * Category class
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;
    
//    @Column(name = "skill_type", nullable = false, length = 20)
//    private String skillType;
//    
//    @Column(name = "age_group", nullable = false, length = 10)
//    private String ageGroup;

    @Column(name = "category_description", length = 255)
    private String categoryDescription;
    
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
