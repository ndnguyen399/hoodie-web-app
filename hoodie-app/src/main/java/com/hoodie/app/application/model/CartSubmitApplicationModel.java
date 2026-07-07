/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.application.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * CartSubmitApplicationModel class
 */
@Getter
@Setter
public class CartSubmitApplicationModel {
    @NotNull
    private Integer productId;

    @Min(1)
    private Integer quantity;
}
