/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, SubmitRequest, UserAddressInitialApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * UserAddressSubmitViewApi
 */
export class UserAddressSubmitViewApi {

    /**
     * initial
     * 
     * @param request {@link UserAddressInitialApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    initial(request: SubmitRequest<UserAddressInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/user-address/initial', request);
    }
    
    /**
     * submit
     * 
     * @param request {@link SubmitRequest<UserAddressInitialApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<UserAddressInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/user-address/submit', request);
    }
}
