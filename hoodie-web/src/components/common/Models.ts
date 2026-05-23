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
/**
 * SubmitApiResponse
 */
export interface SubmitApiResponse<T = any> {
  /**
   * error
   */
  error?: boolean;

  /**
   * message
   */
  message?: string;

  /**
   * data
   */
  data?: T[] | null;
}
/**
 * ReturnSubmitApiResponse
 */
export interface ReturnSubmitApiResponse {
  /**
   * code
   */
  code: string;
  /**
   * message
   */
  message: string;
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
     * skillType
     */
    skillType?: string;
    /**
     * ageGroup
     */
    ageGroup?: string;
    /**
     * categoryName
     */
    categoryName?: string;
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
     * categoryName
     */
    categoryName?: string;
    /**
     * skillType
     */
    skillType?: string;
    /**
     * skillTypeName
     */
    skillTypeName?: string;
    /**
     * ageGroup
     */
    ageGroup?: string;
    /**
     * ageGroupName
     */
    ageGroupName?: string;
    /**
     * categoryDescription
     */
    categoryDescription?: string;
    /**
     * reserveItem01
     */
    reserveItem01?: string;
    /**
     * reserveItem02
     */
    reserveItem02?: string;
    /**
     * reserveItem03
     */
    reserveItem03?: string;
    /**
     * reserveItem04
     */
    reserveItem04?: string;
    /**
     * reserveItem05
     */
    reserveItem05?: string;
    /**
     * deleteFlag
     */
    deleteFlag?: string;
    /**
     * createdAt
     */
    createdAt?: Date;
    /**
     * updatedAt
     */
    updatedAt?: Date;
}
/**
 * CategorySubmitApplicationModel
 */
export interface CategorySubmitApplicationModel {
    /**
     * categoryName
     */
    categoryName?: string;
    /**
     * skillType
     */
    skillType?: string;
    /**
     * ageGroup
     */
    ageGroup?: string;
    /**
     * categoryDescription
     */
    categoryDescription?: string;
}
/**
 * RegisterRequestApplicationModel
 */
export interface RegisterRequestApplicationModel {
    /**
     * fullName
     */
    fullName?: string,
    /**
     * email
     */
    email?: string,
    /**
     * phone
     */
    phone?: string,
    /**
     * password
     */
    password?: string,
}
/**
 * LoginRequestApplicationModel
 */
export interface LoginRequestApplicationModel {
    /**
     * email
     */
    email?: string,
    /**
     * password
     */
    password?: string,
}
/**
 * CodeSearchDomainModel
 */
export interface CodeSearchDomainModel {
    /**
     * codeId
     */
    codeId?: number;
    /**
     * codeCd
     */
    codeCd?: string;
    /**
     * codeName
     */
    codeName?: string;
    /**
     * codeValue
     */
    codeValue?: string;
    /**
     * codeDescription
     */
    codeDescription?: string;
    /**
     * reserveItem01
     */
    reserveItem01?: string;
    /**
     * reserveItem02
     */
    reserveItem02?: string;
    /**
     * reserveItem03
     */
    reserveItem03?: string;
    /**
     * reserveItem04
     */
    reserveItem04?: string;
    /**
     * reserveItem05
     */
    reserveItem05?: string;
    /**
     * deleteFlag
     */
    deleteFlag?: string;
    /**
     * createdAt
     */
    createdAt?: Date;
    /**
     * updatedAt
     */
    updatedAt?: Date;
}
/**
 * CodeSearchApplicationModel
 */
export interface CodeSearchApplicationModel {
    /**
     * codeCd
     */
    codeCd?: string;
}