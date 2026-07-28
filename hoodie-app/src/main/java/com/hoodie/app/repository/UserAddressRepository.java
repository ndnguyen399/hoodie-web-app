/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.UserAddress;
import com.hoodie.app.repository.custom.UserAddressRepositoryCustom;

/**
 * UserAddressRepository class
 */
public interface UserAddressRepository extends JpaRepository<UserAddress, Integer>, UserAddressRepositoryCustom {
    List<UserAddress> findByUserIdAndDeleteFlag(Long userId, String deleteFlag);

    List<UserAddress> findByAddressIdInAndDeleteFlag(List<Integer> addressIds, String deleteFlag);
}
