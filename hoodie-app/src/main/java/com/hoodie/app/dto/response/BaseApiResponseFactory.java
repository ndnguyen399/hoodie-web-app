/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.dto.response;

import com.hoodie.app.dto.response.error.ErrorDetailDto;

/**
 * BaseApiResponseFactory class
 */
public class BaseApiResponseFactory {
    private BaseApiResponseFactory() {
    }

    public static BaseApiResponse<ErrorDetailDto> badRequest(String message, ErrorDetailDto detail) {
        return new BaseApiResponse<>(true, message, detail);
    }

    public static BaseApiResponse<ErrorDetailDto> internalError(String message) {
        return new BaseApiResponse<>(true, message, ErrorDetailDto.builder().code("INTERNAL_SERVER_ERROR").build());
    }
}
