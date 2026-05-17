/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.User;

/**
 * UserRepository class
 */
public interface UserRepository extends JpaRepository<User, Long> {
    // Optional<User> findByUsername(String username);

    // boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
