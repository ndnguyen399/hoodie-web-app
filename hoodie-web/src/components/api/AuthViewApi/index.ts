/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, RegisterRequestApplicationModel, LoginRequestApplicationModel } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * AuthViewApi
 */
export class AuthViewApi {

    /**
     * registration
     * 
     * @param request {@link RegisterRequestApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    registration(request: RegisterRequestApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/auth/register', request);
    }

    /**
     * login
     * 
     * @param request {@link LoginRequestApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    login(request: LoginRequestApplicationModel) {
        return ApiClient.post<BaseApiResponse>('/api/v1/auth/login', request);
    }
}