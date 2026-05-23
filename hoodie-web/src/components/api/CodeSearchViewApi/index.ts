/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, CodeSearchApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * CodeSearchViewApi
 */
export class CodeSearchViewApi {

    /**
     * search
     * 
     * @param request {@link CodeSearchApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    search(request: CodeSearchApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/code/search', request);
    }
}