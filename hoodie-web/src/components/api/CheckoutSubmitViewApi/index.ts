/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CheckoutInitialApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CheckoutSubmitViewApi
 */
export class CheckoutSubmitViewApi {

    /**
     * initial
     * 
     * @param request {@link CheckoutInitialApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    initial(request: SubmitRequest<CheckoutInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/checkout/initial', request);
    }
}