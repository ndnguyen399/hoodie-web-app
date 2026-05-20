/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.RefreshToken;

/**
 * RefreshTokenRepository class
 */
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHashAndDeleteFlag(String tokenHash, String deleteFlag);
}
