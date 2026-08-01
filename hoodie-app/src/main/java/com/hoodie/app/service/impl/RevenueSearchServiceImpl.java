/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.RevenueSearchApplicationModel;
import com.hoodie.app.domain.model.RevenueSearchDomainModel;
import com.hoodie.app.repository.RevenueRepository;
import com.hoodie.app.repository.custom.RevenueRepositoryCustom;
import com.hoodie.app.service.RevenueSearchService;

import lombok.RequiredArgsConstructor;

/**
 * RevenueSearchServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class RevenueSearchServiceImpl implements RevenueSearchService {

    /**
     * RevenueRepositoryCustom
     */
    @Autowired
    private RevenueRepositoryCustom revenueRepositoryCustom;

    /**
     * search
     */
    @Override
    public RevenueSearchDomainModel search(RevenueSearchApplicationModel request) {
        LocalDate fromDate = getFromDate(request);
        LocalDate toDate = getToDate(request);
        RevenueSearchDomainModel result = new RevenueSearchDomainModel();
        result.setSummary(revenueRepositoryCustom.getSummary(fromDate, toDate, request.getRange()));
        result.setRevenueByDate(revenueRepositoryCustom.getRevenueByDate(fromDate, toDate));
        result.setRevenueByCategory(revenueRepositoryCustom.getRevenueByCategory(fromDate, toDate));
        result.setTopProducts(revenueRepositoryCustom.getTopProducts(fromDate, toDate));
        return result;
    }

    /**
     * getFromDate
     * 
     * @param request
     * @return
     */
    private LocalDate getFromDate(RevenueSearchApplicationModel request) {
        LocalDate today = LocalDate.now();
        switch (request.getRange()) {
        case "today":
            return today;
        case "7days":
            return today.minusDays(6);
        case "30days":
            return today.minusDays(29);
        case "90days":
            return today.minusDays(89);
        case "month":
            return today.withDayOfMonth(1);
        case "quarter":
            int quarter = (today.getMonthValue() - 1) / 3;
            return LocalDate.of(today.getYear(), quarter * 3 + 1, 1);
        case "year":
            return LocalDate.of(today.getYear(), 1, 1);
        case "custom":
            return request.getFromDate();
        default:
            return today.minusDays(29);
        }
    }

    /**
     * getToDate
     * 
     * @param request
     * @return
     */
    private LocalDate getToDate(RevenueSearchApplicationModel request) {
        if ("custom".equals(request.getRange())) {
            return request.getToDate();
        }
        return LocalDate.now();
    }
}
