/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, ProductSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * productSearchViewApi
 */
export class ProductSearchViewApi {

    search(request: ProductSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/product/search', request);
    }
}
