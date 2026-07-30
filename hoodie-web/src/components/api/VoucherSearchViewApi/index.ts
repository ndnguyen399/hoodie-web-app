/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, VoucherSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * VoucherSearchViewApi
 */
export class VoucherSearchViewApi {

    /**
     * search
     * 
     * @param request {@link VoucherSearchApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    search(request: VoucherSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/voucher/search', request);
    }
}