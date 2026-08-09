/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, ProductInitialApplicationModel, ProductSubmitApplicationModel, ProductSubmitDeleteApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * productSubmitViewApi
 */
export class ProductSubmitViewApi {

    /**
     * initial
     * 
     * @param request {@link ProductInitialApplicationModel}
     * @returns response {@link BaseApiResponse}
     */
    initial(request: SubmitRequest<ProductInitialApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/product/initial', request);
    }

    /**
     * submit
     * 
     * @param request {@link SubmitRequest<ProductSubmitApplicationModel>}
     * @param images {@link File[]}
     * @returns response {@link BaseApiResponse}
     */
    submit(request: SubmitRequest<ProductSubmitApplicationModel>, images: File[]) {
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
            '/api/v1/product/submit',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    }

    /**
     * submitDelete
     * 
     * @param request {@link SubmitRequest<ProductSubmitDeleteApplicationModel>}
     * @returns response {@link BaseApiResponse}
     */
    submitDelete(request: SubmitRequest<ProductSubmitDeleteApplicationModel>) {
        return ApiClient.post<BaseApiResponse>('/api/v1/product/submitDelete', request);
    }
}
