/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CheckoutSubmitApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CategorySubmitViewApi
 */
export class PaymentSubmitViewApi {
    /**
     * submit
     * 
     * @param request {@link SubmitRequest<CheckoutSubmitApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<CheckoutSubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/payment/submit', request);
    }
}