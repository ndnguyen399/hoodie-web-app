/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CategorySearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CategorySearchViewApi
 */
export class CategorySearchViewApi {

    /**
     * search
     * 
     * @param request {@link CategorySearchApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    search(request: CategorySearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/category/search', request);
    }
}