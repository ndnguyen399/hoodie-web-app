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
/**
 * SubmitRequest
 */
export interface SubmitRequest<T = any> {
    /**
     * requestType
     */
    requestType?: string;
    /**
     * model
     */
    model?: T;
}
// -----------------------[end commons]----------------------- //
/**
 * ProductInitialApplicationModel
 */
export interface ProductInitialApplicationModel {
    /**
     * productId
     */
    productId?: number;
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * productName
     */
    productName?: string;
    /**
     * minPrice
     */
    minPrice?: number;
    /**
     * maxPrice
     */
    maxPrice?: number;
}
/**
 * ProductSearchApplicationModel
 */
export interface ProductSearchApplicationModel {
    /**
     * productId
     */
    productId?: number;
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * productName
     */
    productName?: string;
    /**
     * minPrice
     */
    minPrice?: number;
    /**
     * maxPrice
     */
    maxPrice?: number;
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
     * category Id
     */
    categoryId?: number;
    /**
     * category Name
     */
    categoryName?: string;
    /**
     * product Name
     */
    productName?: string;
    /**
     * product description
     */
    productDescription?: string;
    /**
     * price
     */
    price?: number;
    /**
     * stock quantity
     */
    stockQuantity?: number;
    // /**
    //  * skill Logic
    //  */
    // skillLogic?: string;
    // /**
    //  * skill Logic name
    //  */
    // skillLogicName?: string;
    // /**
    //  * skill Creative
    //  */
    // skillCreative?: string;
    // /**
    //  * skill Creative name
    //  */
    // skillCreativeName?: string;
    // /**
    //  * skill Stem
    //  */
    // skillStem?: string;
    // /**
    //  * skill Stem name
    //  */
    // skillStemName?: string;
    // /**
    //  * skill Motor
    //  */
    // skillMotor?: string;
    // /**
    //  * skill Motor name
    //  */
    // skillMotorName?: string;
    // /**
    //  * skill Social
    //  */
    // skillSocial?: string;
    // /**
    //  * skill Social name
    //  */
    // skillSocialName?: string;
    /**
     * list Images
     */
    listImages?: ProductImageSearchDomainModel[];
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
 * ProductImageSearchDomainModel
 */
export interface ProductImageSearchDomainModel {
    /**
     * imageId
     */
    imageId?: number;
    /**
     * productId
     */
    productId?: number;
    /**
     * imageUrl
     */
    imageUrl?: string;
    /**
     * altText
     */
    altText?: string;
    /**
     * displayOrder
     */
    displayOrder?: number;
    /**
     * isPrimary
     */
    isPrimary?: boolean;
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
 * CategoryInitialApplicationModel
 */
export interface CategoryInitialApplicationModel {
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
    /**
     * categoryDescription
     */
    categoryDescription?: string;
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
 * CategorySubmitApplicationModel
 */
export interface CategorySubmitApplicationModel {
    /**
     * categoryId
     */
    categoryId?: number;
    /**
     * categoryName
     */
    categoryName?: string;
    // /**
    //  * skillType
    //  */
    // skillType?: string;
    // /**
    //  * ageGroup
    //  */
    // ageGroup?: string;
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
}
/**
 * CategorySubmitDeleteApplicationModel
 */
export interface CategorySubmitDeleteApplicationModel {
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
     * ageGroup
     */
    ageGroup?: string;
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
    /**
     * birthDate
     */
    birthDate?: Date,
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
 * LogoutRequestApplicationModel
 */
export interface LogoutRequestApplicationModel {
    /**
     * 
     */
    refreshToken?: string;
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
/**
 * ProductSubmitApplicationModel
 */
export interface ProductSubmitApplicationModel {
    /**
     * productId
     */
    productId?: number;
    /**
     * categorytId
     */
    categoryId?: number;
    /**
     * categoryName
     */
    categoryName?: string;
    /**
     * productName
     */
    productName?: string;
    /**
     * productDescription
     */
    productDescription?: string;
    /**
     * price
     */
    price?: number;
    /**
     * stock quantity
     */
    stockQuantity?: number;
    /**
     * age group
     */
    ageGroup?: string;
    /**
     * age group
     */
    ageGroupName?: string;
    /**
     * skill stem type
     */
    skillStemType?: string;
    /**
     * skill stem type
     */
    skillStemTypename?: string;
    /**
     * video url
     */
    videoUrl?: string;
    /**
     * difficulty level
     */
    difficultyLevel?: string;
    /**
     * difficulty level
     */
    difficultyLevelName?: string;
    /**
     * safety certifications
     */
    safetyCertifications?: string;
    // /**
    //  * skill logic
    //  */
    // skillLogic?: string;
    // /**
    //  * skill creative
    //  */
    // skillCreative?: string;
    // /**
    //  * skill stem
    //  */
    // skillStem?: string;
    // /**
    //  * skill motor
    //  */
    // skillMotor?: string;
    // /**
    //  * skill social
    //  */
    // skillSocial?: string;
    /**
     * changeImageFlag
     */
    changeImageFlag?: string;
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
}
/**
 * CartSubmitApplicationModel
 */
export interface CartSubmitApplicationModel {
    /**
     * productId
     */
    productId?: number;
    /**
     * quantity
     */
    quantity?: number;
}
/**
 * CartSearchApplicationModel
 */
export interface CartSearchApplicationModel {

}
/**
 * CartSearchDomainModel
 */
export interface CartSearchDomainModel {
    /**
     * cartItemId
     */
    cartItemId?: number;
    /**
     * productId
     */
    productId?: number;
    /**
     * productName
     */
    productName?: string;
    /**
     * productDescription
     */
    productDescription?: string;
    /**
     * price
     */
    price?: number;
    /**
     * stockQuantity
     */
    stockQuantity?: number;
    /**
     * imageUrl
     */
    imageUrl?: string;
    /**
     * quantity
     */
    quantity?: number;
}
/**
 * CartSubmitDeleteApplicationModel
 */
export interface CartSubmitDeleteApplicationModel {
    /**
     * cartItemId
     */
    cartItemId?: number;
}
/**
 * CheckoutInitialApplicationModel
 */
export interface CheckoutInitialApplicationModel {
    /**
     * listId
     */
    listId?: []
}
/**
 * CheckoutInitialDomainModel
 */
export interface CheckoutInitialDomainModel {
    /**
     * productLists
     */
    productLists?: CartSearchDomainModel[]
}
/**
 * CheckoutSubmitApplicationModel
 */
export interface CheckoutSubmitApplicationModel {
    /**
     * productLists
     */
    listId?: number[];
    /**
     * note
     */
    note?: string;
    /**
     * paymentMethod
     */
    paymentMethod?: string;
    /**
     * orderId
     */
    orderId?: number;
}
/**
 * ChatbotSessionsApplicationModel
 */
export interface ChatbotSessionsApplicationModel {
    /**
     * session id
     */
    sessionId?: number;
    /**
     * user_id
     */
    userId?: number;
}
/**
 * ChatbotSessionsDomainModel
 */
export interface ChatbotSessionsDomainModel {
    /**
     * session id
     */
    sessionId?: number;
    /**
     * user_id
     */
    userId?: number;
    /**
     * session_title
     */
    sessionTitle?: string;
}
/**
 * ChatbotMessagesDomainModel
 */
export interface ChatbotMessagesDomainModel {
    /**
     * messageId
     */
    messageId?: number;
    /**
     * session id
     */
    sessionId?: number;
    /**
     * content
     */
    content?: string;
    /**
     * token_count
     */
    tokenCount?: number;
    /**
     * reserveItem01 as isBot
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
     * createdAt
     */
    createdAt?: Date;
    /**
     * updatedAt
     */
    updatedAt?: Date;
}
/**
 * ChatbotMessagesApplicationModel
 */
export interface ChatbotMessagesApplicationModel {
    /**
     * inputText
     */
    inputText?: string;
}