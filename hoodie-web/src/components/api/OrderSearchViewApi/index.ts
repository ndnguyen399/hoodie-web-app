/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, OrderSearchApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * OrderSearchViewApi
 */
export class OrderSearchViewApi {

    /**
     * search
     * 
     * @param request 
     * @returns 
     */
    search(request: OrderSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/order/search', request);
    }

    /**
     * deleveryOrder
     * 
     * @param request 
     * @returns 
     */
    deleveryOrder(request: SubmitRequest<OrderSearchApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/order/delevery-order', request);
    }
}
