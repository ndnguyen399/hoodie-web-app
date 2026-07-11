/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.domain.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * CheckoutInitialDomainModel class
 */
@Setter
@Getter
public class CheckoutInitialDomainModel {
    private List<CartSearchDomainModel> productLists;
}
