/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.User;
import com.hoodie.app.repository.custom.ProfileRepositoryCustom;

/**
 * ProfileRepository class
 */
public interface ProfileRepository extends JpaRepository<User, Long>, ProfileRepositoryCustom {

}
