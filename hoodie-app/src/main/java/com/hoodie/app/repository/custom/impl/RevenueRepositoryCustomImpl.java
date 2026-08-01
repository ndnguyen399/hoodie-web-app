/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository.custom.impl;

import static com.app.jooq.generated.tables.Categories.CATEGORIES;
import static com.app.jooq.generated.tables.OrderItems.ORDER_ITEMS;
import static com.app.jooq.generated.tables.Orders.ORDERS;
import static com.app.jooq.generated.tables.Products.PRODUCTS;
import static org.jooq.impl.DSL.coalesce;
import static org.jooq.impl.DSL.count;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.sum;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hoodie.app.domain.model.RevenueByCategory;
import com.hoodie.app.domain.model.RevenueByDate;
import com.hoodie.app.domain.model.RevenueByProduct;
import com.hoodie.app.domain.model.RevenueSummary;
import com.hoodie.app.repository.custom.RevenueRepositoryCustom;

import lombok.RequiredArgsConstructor;

/**
 * RevenueRepositoryCustomImpl class
 */
@Repository
@RequiredArgsConstructor
public class RevenueRepositoryCustomImpl implements RevenueRepositoryCustom {

    /**
     * DSLContext
     */
    @Autowired
    private DSLContext dsl;

    /**
     * com.app.jooq.generated.tables.Orders
     */
//    private static final com.app.jooq.generated.tables.Orders ORDERS = ORDERS.as("o");

    /**
     * DEFAULT_DELETE_FLAG
     */
    private final String DEFAULT_DELETE_FLAG = "0";

    /**
     * getSummary
     */
    @Override
    public RevenueSummary getSummary(LocalDate fromDate, LocalDate toDate, String range) {
        BigDecimal totalRevenue = dsl.select(coalesce(sum(ORDERS.TOTAL_AMOUNT), BigDecimal.ZERO)).from(ORDERS)
                .where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(fromDate, toDate)).fetchOneInto(BigDecimal.class);
        Integer totalOrders = dsl.selectCount().from(ORDERS).where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(fromDate, toDate)).fetchOne(0, Integer.class);
        BigDecimal averageOrderValue = totalOrders == 0 ? BigDecimal.ZERO
                : totalRevenue.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP);
        RevenueSummary summary = new RevenueSummary();
        summary.setTotalRevenue(totalRevenue);
        summary.setTotalOrders(totalOrders);
        summary.setAverageOrderValue(averageOrderValue);
        calculateGrowthRate(summary, fromDate, toDate);
        return summary;
    }

    private void calculateGrowthRate(RevenueSummary summary, LocalDate fromDate, LocalDate toDate) {
        long days = ChronoUnit.DAYS.between(fromDate, toDate) + 1;
        LocalDate previousFrom = fromDate.minusDays(days);
        LocalDate previousTo = fromDate.minusDays(1);
        BigDecimal previousRevenue = dsl.select(coalesce(sum(ORDERS.TOTAL_AMOUNT), BigDecimal.ZERO)).from(ORDERS)
                .where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(previousFrom, previousTo))
                .fetchOneInto(BigDecimal.class);
        summary.setPreviousRevenue(previousRevenue);
        BigDecimal diff = summary.getTotalRevenue().subtract(previousRevenue);
        summary.setRevenueDifference(diff);
        if (previousRevenue.compareTo(BigDecimal.ZERO) == 0) {
            summary.setGrowthRate(BigDecimal.ZERO);
            return;
        }
        BigDecimal growthRate = diff.multiply(BigDecimal.valueOf(100)).divide(previousRevenue, 2, RoundingMode.HALF_UP);
        summary.setGrowthRate(growthRate);
    }

    /**
     * getRevenueByDate
     */
    @Override
    public List<RevenueByDate> getRevenueByDate(LocalDate fromDate, LocalDate toDate) {
        return dsl
                .select(ORDERS.CREATED_AT.cast(LocalDate.class).as("date"), sum(ORDERS.TOTAL_AMOUNT).as("revenue"),
                        count().as("orders"))
                .from(ORDERS).where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(fromDate, toDate))
                .groupBy(ORDERS.CREATED_AT.cast(LocalDate.class)).orderBy(ORDERS.CREATED_AT.cast(LocalDate.class))
                .fetch(record -> {
                    RevenueByDate item = new RevenueByDate();
                    item.setDate(record.get("date", LocalDate.class));
                    item.setRevenue(record.get("revenue", BigDecimal.class));
                    item.setOrders(record.get("orders", Integer.class));
                    return item;
                });
    }

    /**
     * getRevenueByCategory
     */
    @Override
    public List<RevenueByCategory> getRevenueByCategory(LocalDate fromDate, LocalDate toDate) {
        return dsl.select(CATEGORIES.CATEGORY_NAME, sum(ORDER_ITEMS.UNIT_PRICE.mul(ORDER_ITEMS.QUANTITY)).as("revenue"))
                .from(ORDER_ITEMS).join(ORDERS).on(ORDER_ITEMS.ORDER_ID.eq(ORDERS.ORDER_ID)).join(PRODUCTS)
                .on(PRODUCTS.PRODUCT_ID.eq(ORDER_ITEMS.PRODUCT_ID)).join(CATEGORIES)
                .on(CATEGORIES.CATEGORY_ID.eq(PRODUCTS.CATEGORY_ID)).where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(fromDate, toDate))
                .groupBy(CATEGORIES.CATEGORY_NAME).orderBy(field("revenue").desc()).fetch(record -> {
                    RevenueByCategory item = new RevenueByCategory();
                    item.setCategoryName(record.get(CATEGORIES.CATEGORY_NAME));
                    item.setRevenue(record.get("revenue", BigDecimal.class));
                    return item;
                });
    }

    /**
     * getTopProducts
     */
    @Override
    public List<RevenueByProduct> getTopProducts(LocalDate fromDate, LocalDate toDate) {
        return dsl
                .select(ORDER_ITEMS.PRODUCT_NAME, sum(ORDER_ITEMS.UNIT_PRICE.mul(ORDER_ITEMS.QUANTITY)).as("revenue"),
                        sum(ORDER_ITEMS.QUANTITY).as("quantity"))
                .from(ORDER_ITEMS).join(ORDERS).on(ORDER_ITEMS.ORDER_ID.eq(ORDERS.ORDER_ID))
                .where(ORDERS.ORDER_STATUS.eq("delivered"))
                .and(ORDERS.CREATED_AT.cast(LocalDate.class).between(fromDate, toDate))
                .groupBy(ORDER_ITEMS.PRODUCT_NAME).orderBy(field("revenue").desc()).limit(10).fetch(record -> {
                    RevenueByProduct item = new RevenueByProduct();
                    item.setProductName(record.get(ORDER_ITEMS.PRODUCT_NAME));
                    item.setRevenue(record.get("revenue", BigDecimal.class));
                    item.setQuantity(record.get("quantity", Integer.class));
                    return item;
                });
    }
}
