/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CategoryInitialApplicationModel, CategorySubmitApplicationModel, CategorySubmitDeleteApplicationModel, SubmitRequest, VoucherSubmitApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * VoucherSubmitViewApi
 */
export class VoucherSubmitViewApi {
    /**
     * submit
     * 
     * @param request {@link SubmitRequest<VoucherSubmitApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<VoucherSubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/voucher/submit', request);
    }

    /**
     * submitDelete
     * 
     * @param request {@link SubmitRequest<CategorySubmitDeleteApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submitDelete(request: SubmitRequest<VoucherSubmitApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/voucher/submitDelete', request);
    }
}