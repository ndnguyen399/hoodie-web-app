/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Voucher;

/**
 * VoucherRepository
 */
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByDeleteFlag(String deleteFlag);

    List<Voucher> findByPromotionCodeAndDeleteFlag(String promotionCode, String deleteFlag);

    Voucher findByPromotionIdAndDeleteFlag(Integer promotionCode, String deleteFlag);
}
