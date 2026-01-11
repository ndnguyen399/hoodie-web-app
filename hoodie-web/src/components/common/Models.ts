/**
 * @author duynguyen © 2025
 */
// -----------------------[start commons]----------------------- //
/**
 * BaseApiResponse
 */
export interface BaseApiResponse<T = any> {
  /**
   * error
   */
  error: boolean;

  /**
   * message
   */
  message: string;

  /**
   * data
   */
  data: T | null;
}
/**
 * SearchInfoResponse
 */
export interface SearchInfoResponse {
    /**
     * total
     */
    total?: number;
}
/**
 * SearchResponse
 */
export interface SearchResponse<T = any> {
    /**
     * info
     */
    info?: SearchInfoResponse;
    /**
     * search
     */
    search?: T[];
}
// -----------------------[end commons]----------------------- //
/**
 * ProductSearchApplicationModel
 */
export interface ProductSearchApplicationModel {
    /**
     * keyword
     */
    keyword?: string;
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * colorId
     */
    colorId?: number;
    /**
     * sizeId
     */
    sizeId?: number;
    /**
     * minPrice
     */
    minPrice?: string;
    /**
     * maxPrice
     */
    maxPrice?: string;
}
/**
 * ProductSearchDomainModel
 */
export interface ProductSearchDomainModel {
    /**
     * product Id
     */
    productId?: number;
    /**
     * product Name
     */
    productName?: string;
    /**
     * category Name
     */
    categoryName?: string;
    /**
     * display Price
     */
    displayPrice?: number;
    /**
     * primary Image Url
     */
    primaryImageUrl?: string;
}
/**
 * CategorySearchApplicationModel
 */
export interface CategorySearchApplicationModel {
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * categoryHistoryNo
     */
    categoryHistoryNo?: number;
    /**
     * categoryName
     */
    categoryName?: string;
    /**
     * categoryDescription
     */
    categoryDescription?: string;
}
/**
 * CategorySearchDomainModel
 */
export interface CategorySearchDomainModel {
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * categoryHistoryNo
     */
    categoryHistoryNo?: number;
    /**
     * categoryName
     */
    categoryName?: string;
    /**
     * categoryDescription
     */
    categoryDescription?: string;
}