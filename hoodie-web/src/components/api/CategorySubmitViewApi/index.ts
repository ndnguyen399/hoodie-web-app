/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CategorySubmitApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CategorySubmitViewApi
 */
export class CategorySubmitViewApi {

    /**
     * submit
     * 
     * @param request {@link SubmitRequest<CategorySubmitApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<CategorySubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/category/submit', request);
    }
}