/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.User;

/**
 * UserRepository class
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByEmailAndDeleteFlag(String email, String deleteFlag);
    // boolean existsByUsername(String username);
    User findByUserIdAndEmailAndDeleteFlag(Long userId, String email, String deleteFlag);
    boolean existsByEmail(String email);
}
