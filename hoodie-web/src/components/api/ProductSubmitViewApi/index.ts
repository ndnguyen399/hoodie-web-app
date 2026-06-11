/**
 * @author duynguyen © 2025
 */
import type { BaseApiResponse, ProductSubmitApplicationModel, SubmitRequest } from '../../common/Models';
import { ApiClient } from '../config/api.client';

/**
 * productSubmitViewApi
 */
export class ProductSubmitViewApi {

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
}
