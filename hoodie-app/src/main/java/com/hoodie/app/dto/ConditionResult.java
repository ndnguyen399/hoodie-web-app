/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto;

import java.util.Map;

import lombok.Data;

/**
 * ConditionResult class
 */
@Data
public class ConditionResult {
    String whereClause;
    Map<String, Object> params;

    public ConditionResult(String whereClause, Map<String, Object> params) {
        this.whereClause = whereClause;
        this.params = params;
    }
}
