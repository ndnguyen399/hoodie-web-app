/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto.response;

import lombok.Data;
import java.util.List;

/**
 * SearchResponse class
 */
@Data
public class SearchResponse<T> {
    private SearchInfoResponse info;
    private List<T> search;

    public SearchResponse(long total, List<T> data) {
        this.info = new SearchInfoResponse(total);
        this.search = data;
    }
}
