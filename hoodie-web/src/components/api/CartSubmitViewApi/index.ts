/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CartSubmitApplicationModel, SubmitRequest } from '../../common/Models';
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
}