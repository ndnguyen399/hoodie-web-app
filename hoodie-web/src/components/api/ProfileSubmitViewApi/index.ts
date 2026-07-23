/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, ProfileInitialApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * ProfileSubmitViewApi
 */
export class ProfileSubmitViewApi {

    /**
     * initial
     * 
     * @param request {@link ProfileInitialApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    initial(request: SubmitRequest<ProfileInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/profile/initial', request);
    }
    
    /**
     * submit
     * 
     * @param request {@link SubmitRequest<ProductSubmitApplicationModel>}
     * @param images {@link File[]}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<ProfileInitialApplicationModel>, images: File[]) {
        const formData = new FormData();

        /* 
            * request json
            */
        formData.append(
            'request',
            new Blob(
                [JSON.stringify(request)],
                {
                    type: 'application/json'
                }
            )
        );

        /* 
            * images
            */
        images.forEach(image => {
            formData.append('images', image);
        });

        return ApiClient.postContainFile<BaseApiResponse>(
            '/api/v1/profile/submit',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    }
}
