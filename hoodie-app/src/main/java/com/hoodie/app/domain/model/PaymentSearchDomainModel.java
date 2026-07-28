/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

/**
 * PaymentSearchDomainModel class
 */
@Getter
@Setter
public class PaymentSearchDomainModel {
    private String paymentMethod;
    private String paymentStatus;
    private BigDecimal amount;
    private OffsetDateTime paidAt;
    private String gateway;
    private String transactionRef;
}
