/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CartSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CartSearchViewApi
 */
export class CartSearchViewApi {

    /**
     * search
     * 
     * @param request {@link CartSearchApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    search(request: CartSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/cart/search', request);
    }
}