/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CategoryInitialApplicationModel, CategorySubmitApplicationModel, CategorySubmitDeleteApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CategorySubmitViewApi
 */
export class CategorySubmitViewApi {

    /**
     * initial
     * 
     * @param request {@link CategoryInitialApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    initial(request: SubmitRequest<CategoryInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/category/initial', request);
    }

    /**
     * submit
     * 
     * @param request {@link SubmitRequest<CategorySubmitApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<CategorySubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/category/submit', request);
    }

    /**
     * submitDelete
     * 
     * @param request {@link SubmitRequest<CategorySubmitDeleteApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submitDelete(request: SubmitRequest<CategorySubmitDeleteApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/category/submitDelete', request);
    }
}