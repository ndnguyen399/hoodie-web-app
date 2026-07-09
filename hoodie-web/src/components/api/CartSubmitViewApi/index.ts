/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CartSubmitApplicationModel, CartSubmitDeleteApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CartSubmitViewApi
 */
export class CartSubmitViewApi {

    /**
     * submit
     * 
     * @param request {@link SubmitRequest<CartSubmitApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<CartSubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/cart/submit', request);
    }

    /**
     * submitDelete
     * 
     * @param request {@link SubmitRequest<CategorySubmitDeleteApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submitDelete(request: SubmitRequest<CartSubmitDeleteApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/cart/submitDelete', request);
    }
}