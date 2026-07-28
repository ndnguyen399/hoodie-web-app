/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, OrderSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * OrderSearchViewApi
 */
export class OrderSearchViewApi {

    search(request: OrderSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/order/search', request);
    }
}
