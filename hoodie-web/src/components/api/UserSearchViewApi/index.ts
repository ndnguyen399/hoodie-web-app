/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, SubmitRequest, UserSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * UserSearchViewApi
 */
export class UserSearchViewApi {

    /**
     * search
     * 
     * @param request 
     * @returns 
     */
    search(request: UserSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/user/search', request);
    }

    /**
     * block
     * 
     * @param request 
     * @returns 
     */
    block(request: SubmitRequest<UserSearchApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/user/block', request);
    }
}
