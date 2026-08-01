/**
 * @author duynguyen © 2025
 */
import type { RevenueSearchApplicationModel } from '../../common/Models';
// import { ApiClient } from '../config/api.client';

export class RevenueSearchViewApi {

    /**
     * search
     * 
     * @param request 
     * @returns 
     */
    async search(request: RevenueSearchApplicationModel) {
        const response = await fetch(
            "http://localhost:8081/api/v1/revenue/search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(request)
            }
        );
        if (!response.ok) {
            throw new Error("API Error");
        }
        return await response.json();
    }
}