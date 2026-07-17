/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.entity.Payment;

/**
 * PaymentRepository class
 */
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByTransactionRef(String transactionRef);

//    Optional<Payment> findByOrderId(Long orderId);
}
