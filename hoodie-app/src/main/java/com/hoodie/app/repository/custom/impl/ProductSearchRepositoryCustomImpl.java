/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import java.math.BigDecimal;
//import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.hoodie.app.application.model.ProductSearchApplicationModel;
import com.hoodie.app.domain.model.ProductSearchDomainModel;
import com.hoodie.app.dto.ConditionResult;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.repository.custom.ProductSearchRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

/**
 * ProductSearchRepositoryImpl class
 */
@Repository
@RequiredArgsConstructor
public class ProductSearchRepositoryCustomImpl implements ProductSearchRepositoryCustom {

    /**
     * EntityManager
     */
    private final EntityManager entityManager;

    /**
     * Query SQL search all product
     * 
     * @param request {@link ProductSearchApplicationModel}
     * @return {@link SearchResponse<ProductSearchDomainModel>}
     */
    @Override
    public SearchResponse<ProductSearchDomainModel> search(ProductSearchApplicationModel request) {
        ConditionResult conditions = buildConditions(request);

        // ===== PHẦN SEARCH DATA =====
        String dataSql = buildDataSql(conditions.getWhereClause());
        Query dataQuery = entityManager.createNativeQuery(dataSql);
        applyParameters(dataQuery, conditions.getParams());
        // applyPagination(dataQuery, request.getPage(), request.getSize());

        @SuppressWarnings("unchecked")
        List<Object[]> rows = dataQuery.getResultList();
        List<ProductSearchDomainModel> data = mapToDomainModel(rows);

        // ===== PHẦN COUNT =====
        String countSql = buildCountSql(conditions.getWhereClause());
        Query countQuery = entityManager.createNativeQuery(countSql);
        applyParameters(countQuery, conditions.getParams());

        long total = ((Number) countQuery.getSingleResult()).longValue();

        return new SearchResponse<>(total, data);
    }

    // ================ Private helper methods ================

    /**
     * buildConditions
     * 
     * @param request
     * @return {@link ConditionResult}
     */
    private ConditionResult buildConditions(ProductSearchApplicationModel request) {
        StringBuilder where = new StringBuilder(" WHERE t.delete_flag = '0' ");
        Map<String, Object> params = new HashMap<>();

        if (StringUtils.hasText(request.getKeyword())) {
            where.append("""
                    AND (
                        t.product_name ILIKE :keyword
                        OR t.product_description ILIKE :keyword
                    )
                    """);
            params.put("keyword", "%" + request.getKeyword() + "%");
        }
        if (request.getCategoryId() != null) {
            where.append(" AND t.category_id = :categoryId ");
            params.put("categoryId", request.getCategoryId());
        }
        if (request.getColorId() != null) {
            where.append(" AND t2.color_id = :colorId ");
            params.put("colorId", request.getColorId());
        }
        if (request.getSizeId() != null) {
            where.append(" AND t2.size_id = :sizeId ");
            params.put("sizeId", request.getSizeId());
        }
        if (request.getMinPrice() != null) {
            where.append(" AND COALESCE(t2.variant_price, t.product_price) >= :minPrice ");
            params.put("minPrice", request.getMinPrice());
        }
        if (request.getMaxPrice() != null) {
            where.append(" AND COALESCE(t2.variant_price, t.product_price) <= :maxPrice ");
            params.put("maxPrice", request.getMaxPrice());
        }

        return new ConditionResult(where.toString(), params);
    }

    /**
     * buildDataSql
     * 
     * @param whereClause
     * @return String
     */
    private String buildDataSql(String whereClause) {
        return """
                SELECT
                    t.product_id
                    , t.product_name
                    , e2.category_name
                    , MIN(COALESCE(t2.variant_price, t.product_price)) AS display_price
                    , t3.product_image_url
                    , SUM(t2.stock) AS total_stock
                    , t.created_at
                FROM products t
                INNER JOIN (
                    SELECT product_id, MAX(product_history_no) as product_history_no
                    FROM products
                    GROUP BY product_id
                ) e1
                    ON e1.product_id = t.product_id
                    AND e1.product_history_no = t.product_history_no
                    AND t.delete_flag = '0'
                INNER JOIN (
                    SELECT c.category_id, c.category_history_no, c.category_name
                    FROM categories c
                    INNER JOIN (
                        SELECT category_id, MAX(category_history_no) as category_history_no
                        FROM categories
                        GROUP BY category_id
                    ) c1
                        ON c1.category_id = c.category_id
                        AND c1.category_history_no = c.category_history_no
                    AND c.delete_flag = '0'
                ) e2
                    ON e2.category_id = t.category_id
                    AND t.delete_flag = '0'
                LEFT JOIN product_variants t2
                    ON t2.product_id = t.product_id
                    AND t2.delete_flag = '0'
                LEFT JOIN product_images t3
                    ON t3.product_id = t.product_id
                    AND t3.is_primary = true
                    AND t3.delete_flag = '0'
                """ + whereClause + """
                  GROUP BY
                      t.product_id
                      , t.product_name
                      , e2.category_name
                      , t3.product_image_url
                      , t.created_at
                      ORDER BY
                      t.created_at DESC
                """;
    }

    /**
     * buildCountSql
     * 
     * @param whereClause
     * @return String
     */
    private String buildCountSql(String whereClause) {
        return """
                SELECT COUNT(DISTINCT t.product_id)
                FROM products t
                INNER JOIN (
                    SELECT product_id, MAX(product_history_no) as product_history_no
                    FROM products
                    GROUP BY product_id
                ) e1
                    ON e1.product_id = t.product_id
                    AND e1.product_history_no = t.product_history_no
                    AND t.delete_flag = '0'
                INNER JOIN (
                    SELECT c.category_id, c.category_history_no, c.category_name
                    FROM categories c
                    INNER JOIN (
                        SELECT category_id, MAX(category_history_no) as category_history_no
                        FROM categories
                        GROUP BY category_id
                    ) c1
                        ON c1.category_id = c.category_id
                        AND c1.category_history_no = c.category_history_no
                    AND c.delete_flag = '0'
                ) e2
                    ON e2.category_id = t.category_id
                    AND t.delete_flag = '0'
                LEFT JOIN product_variants t2
                    ON t2.product_id = t.product_id
                    AND t2.delete_flag = '0'
                LEFT JOIN product_images t3
                    ON t3.product_id = t.product_id
                    AND t3.is_primary = true
                    AND t3.delete_flag = '0'
                """ + whereClause;
    }

    /**
     * applyParameters
     * 
     * @param query
     * @param params
     * @return void
     */
    private void applyParameters(Query query, Map<String, Object> params) {
        params.forEach(query::setParameter);
    }

    /**
     * applyPagination
     * 
     * @param query
     * @param page
     * @param size
     * @return void
     */
//    private void applyPagination(Query query, int page, int size) {
//        query.setFirstResult(page * size);
//        query.setMaxResults(size);
//    }

    /**
     * mapToDomainModel
     * 
     * @param rows
     * @return List<ProductSearchDomainModel>
     */
    private List<ProductSearchDomainModel> mapToDomainModel(List<Object[]> rows) {
        return rows.stream()
                .map(r -> new ProductSearchDomainModel(((Number) r[0]).longValue(), (String) r[1], (String) r[2],
                        r[3] == null ? null : (BigDecimal) r[3], // r[5] == null ? null : ((Number) r[5]).intValue(),
                        (String) r[4]))
                .toList();
    }
}
