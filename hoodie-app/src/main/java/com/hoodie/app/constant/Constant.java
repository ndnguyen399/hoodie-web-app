/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.constant;

import java.math.BigDecimal;

/**
 * Constant class
 */
public final class Constant {
    private Constant() {
    }

    // payment method and vnpay
    public static final String PAYMENT_METHOD_COD = "COD";
    public static final String PAYMENT_METHOD_VNPAY = "VNPAY";
    public static final String SUCCESS = "00";
    public static final String BANK_CODE = "NCB";

    // order status
    public static final String ORDER_STATUS_PENDING = "pending";
    public static final String ORDER_STATUS_CONFIRMED = "confirmed";
    public static final String ORDER_STATUS_SHIPPING = "shipping";
    public static final String ORDER_STATUS_DELIVERED = "delivered";
    public static final String ORDER_STATUS_CANCELLED = "cancelled";

    // shipping fee
    public static final BigDecimal SHIPPING_FEE = BigDecimal.valueOf(30000);

    // Change Image
    public static final String FLAG_CHANGE_IMAGE_YES = "01";
    public static final String FLAG_CHANGE_IMAGE_NO = "02";

    // Cloudinary
    public static final String FOLDER = "folder";
    public static final String PRODUCTS = "products";

    // reuqest type
    public static final String CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL = "01";
    public static final String CONSTANT_SUBMIT_REQUEST_TYPE_CREATE = "02";
    public static final String CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE = "03";
    public static final String CONSTANT_SUBMIT_REQUEST_TYPE_DELETE = "04";

    // Paths
    public static final String DELETE_FLAG_ZERO = "0";
    public static final String DELETE_FLAG_ONE = "1";

    // Code No Error
    public static final String NO_ERROR = "I.HOODIE.SUCCESS";

    // Code Error
    public static final String ERROR_VALIDATE = "E.HOODIE.ERROR";

    // Message Error
    public static final String INTERNAL_SERVER_ERROR = "Lỗi không mong muốn";

    // Message info success
    public static final String INFO_SUCCESS = "Tạo mới thành công";

    public static final String INFO_UPDATE_SUCCESS = "Cập nhật thành công";

    public static final String INFO_DELETE_SUCCESS = "Xóa thành công";

    // Code Error existsByEmail
    public static final String EXISTS_BY_EMAIL_CODE = "E.HOODIE.ERROR";

    // Code Error
    public static final String BUSINESS_VALIDATE_FAILED = "Có lỗi xảy ra vui lòng kiểm tra lại";

    // ==== name fields ====
    public static final String EMAIL = "Email";

    // ==== Message fields ====
    public static final String FULL_NAME_NOT_BLANK = "Họ và tên không được để trống";
    public static final String EMAIL_NOT_BLANK = "Email không được để trống";
    public static final String EMAIL_INVALID = "Email không đúng định dạng";
    public static final String PASSWORD_NOT_BLANK = "Mật khẩu không được để trống";
    public static final String PHONE_INVALID = "Số điện thoại không hợp lệ";
    public static final String REQUEST_TYPE_NOT_BLANK = "Request Type Không được để trống";
    public static final String MODEL_NOT_BLANK = "Model Không được để trống";
    public static final String REQUEST_TYPE_NOT_VALID = "Bạn không thể xóa";

    // ========================
    // AUTH / TÀI KHOẢN
    // ========================
    public static final String EXISTS_BY_EMAIL_MESSAGE = "Tài khoản đã tồn tại";
    public static final String ACCOUNT_NOT_FOUND_MESSAGE = "Tài khoản không tồn tại";
    public static final String ACCOUNT_DISABLED_MESSAGE = "Tài khoản đã bị vô hiệu hóa";
    public static final String ACCOUNT_LOCKED_MESSAGE = "Tài khoản đã bị khóa";
    public static final String INVALID_CREDENTIALS_MESSAGE = "Email hoặc mật khẩu không chính xác";
    public static final String UNAUTHORIZED_MESSAGE = "Bạn chưa đăng nhập";
    public static final String ACCESS_DENIED_MESSAGE = "Bạn không có quyền thực hiện thao tác này";
    public static final String TOKEN_INVALID_MESSAGE = "Token không hợp lệ";
    public static final String TOKEN_NOT_NULL_MESSAGE = "Token không được để trống";
    public static final String TOKEN_EXPIRED_MESSAGE = "Token đã hết hạn";
    public static final String TOKEN_REVOKED_MESSAGE = "Token đã bị thu hồi";
    public static final String REGISTER_SUCCESS_MESSAGE = "Đăng ký tài khoản thành công";
    public static final String LOGIN_SUCCESS_MESSAGE = "Đăng nhập thành công";
    public static final String LOGOUT_SUCCESS_MESSAGE = "Đăng xuất thành công";
    public static final String PASSWORD_CHANGED_SUCCESS_MESSAGE = "Đổi mật khẩu thành công";
    public static final String PASSWORD_INCORRECT_MESSAGE = "Mật khẩu hiện tại không chính xác";
    public static final String PASSWORD_NOT_MATCH_MESSAGE = "Mật khẩu xác nhận không khớp";
    public static final String RESET_PASSWORD_EMAIL_SENT_MESSAGE = "Email đặt lại mật khẩu đã được gửi";
    public static final String RESET_PASSWORD_SUCCESS_MESSAGE = "Đặt lại mật khẩu thành công";

    // ========================
    // NGƯỜI DÙNG
    // ========================
    public static final String USER_NOT_FOUND_MESSAGE = "Người dùng không tồn tại";
    public static final String USER_CREATED_SUCCESS_MESSAGE = "Tạo người dùng thành công";
    public static final String USER_UPDATED_SUCCESS_MESSAGE = "Cập nhật thông tin người dùng thành công";
    public static final String USER_DELETED_SUCCESS_MESSAGE = "Xóa người dùng thành công";
    public static final String USER_FETCHED_SUCCESS_MESSAGE = "Lấy thông tin người dùng thành công";

    // ========================
    // SẢN PHẨM
    // ========================
    public static final String PRODUCT_NOT_FOUND_MESSAGE = "Sản phẩm không tồn tại";
    public static final String PRODUCT_CREATED_SUCCESS_MESSAGE = "Thêm sản phẩm thành công";
    public static final String PRODUCT_UPDATED_SUCCESS_MESSAGE = "Cập nhật sản phẩm thành công";
    public static final String PRODUCT_DELETED_SUCCESS_MESSAGE = "Xóa sản phẩm thành công";
    public static final String PRODUCT_FETCHED_SUCCESS_MESSAGE = "Lấy danh sách sản phẩm thành công";
    public static final String PRODUCT_OUT_OF_STOCK_MESSAGE = "Sản phẩm đã hết hàng";
    public static final String PRODUCT_INSUFFICIENT_STOCK_MESSAGE = "Số lượng sản phẩm trong kho không đủ";
    public static final String PRODUCT_ALREADY_EXISTS_MESSAGE = "Sản phẩm đã tồn tại";
    public static final String PRODUCT_NOT_NULL_MESSAGE = "Sản phẩm không được để trống";
    public static final String PRICE_NOT_NULL_MESSAGE = "Giá không được để trống";
    public static final String STOCK_NOT_NULL_MESSAGE = "Số lượng không được để trống";
    public static final String SKILL_LOGIC_NOT_NULL_MESSAGE = "Chỉ số tư duy không được để trống";
    public static final String SKILL_CREATIVE_NOT_NULL_MESSAGE = "Chỉ số sáng tạo không được để trống";
    public static final String SKILL_STEM_NOT_NULL_MESSAGE = "Chỉ số STEM không được để trống";
    public static final String SKILL_MOTOR_NOT_NULL_MESSAGE = "Chỉ số vận động không được để trống";
    public static final String SKILL_SOCIAL_NOT_NULL_MESSAGE = "Chỉ số xã hội không được để trống";

    // ========================
    // DANH MỤC
    // ========================
    public static final String CATEGORY_NOT_FOUND_MESSAGE = "Danh mục không tồn tại";
    public static final String CATEGORY_CREATED_SUCCESS_MESSAGE = "Thêm danh mục thành công";
    public static final String CATEGORY_UPDATED_SUCCESS_MESSAGE = "Cập nhật danh mục thành công";
    public static final String CATEGORY_DELETED_SUCCESS_MESSAGE = "Xóa danh mục thành công";
    public static final String CATEGORY_ALREADY_EXISTS_MESSAGE = "Danh mục đã tồn tại";
    public static final String CATEGORY_HAS_PRODUCTS_MESSAGE = "Không thể xóa danh mục đang chứa sản phẩm";
    public static final String CATEGORY_NAME_NOT_NULL_MESSAGE = "Tên danh mục không được để trống";
    public static final String CATEGORY_SKILL_TYPE_NOT_NULL_MESSAGE = "Loại kỹ năng không được để trống";
    public static final String CATEGORY_AGE_GROUP_NULL_MESSAGE = "Nhóm tuổi không được để trống";
    public static final String CATEGORY_ID_NOT_NULL_MESSAGE = "ID danh mục không được để trống";

    // ========================
    // GIỎ HÀNG
    // ========================
    public static final String CART_NOT_FOUND_MESSAGE = "Giỏ hàng không tồn tại";
    public static final String CART_ITEM_NOT_FOUND_MESSAGE = "Sản phẩm không có trong giỏ hàng";
    public static final String CART_ITEM_ADDED_SUCCESS_MESSAGE = "Thêm sản phẩm vào giỏ hàng thành công";
    public static final String CART_ITEM_UPDATED_SUCCESS_MESSAGE = "Cập nhật giỏ hàng thành công";
    public static final String CART_ITEM_REMOVED_SUCCESS_MESSAGE = "Xóa sản phẩm khỏi giỏ hàng thành công";
    public static final String CART_CLEARED_SUCCESS_MESSAGE = "Xóa toàn bộ giỏ hàng thành công";
    public static final String CART_EMPTY_MESSAGE = "Giỏ hàng đang trống";

    // ========================
    // ĐƠN HÀNG
    // ========================
    public static final String ORDER_NOT_FOUND_MESSAGE = "Đơn hàng không tồn tại";
    public static final String ORDER_CREATED_SUCCESS_MESSAGE = "Đặt hàng thành công";
    public static final String ORDER_UPDATED_SUCCESS_MESSAGE = "Cập nhật đơn hàng thành công";
    public static final String ORDER_CANCELLED_SUCCESS_MESSAGE = "Hủy đơn hàng thành công";
    public static final String ORDER_CANNOT_CANCEL_MESSAGE = "Đơn hàng không thể hủy ở trạng thái hiện tại";
    public static final String ORDER_ALREADY_CANCELLED_MESSAGE = "Đơn hàng đã được hủy trước đó";
    public static final String ORDER_DELIVERED_SUCCESS_MESSAGE = "Đơn hàng đã được giao thành công";
    public static final String ORDER_FETCHED_SUCCESS_MESSAGE = "Lấy danh sách đơn hàng thành công";

    // ========================
    // THANH TOÁN
    // ========================
    public static final String PAYMENT_SUCCESS_MESSAGE = "Thanh toán thành công";
    public static final String PAYMENT_FAILED_MESSAGE = "Thanh toán thất bại";
    public static final String PAYMENT_PENDING_MESSAGE = "Thanh toán đang chờ xử lý";
    public static final String PAYMENT_CANCELLED_MESSAGE = "Thanh toán đã bị hủy";
    public static final String PAYMENT_NOT_FOUND_MESSAGE = "Không tìm thấy thông tin thanh toán";
    public static final String PAYMENT_ALREADY_PAID_MESSAGE = "Đơn hàng đã được thanh toán trước đó";
    public static final String PAYMENT_METHOD_NOT_SUPPORTED_MESSAGE = "Phương thức thanh toán không được hỗ trợ";

    // ========================
    // MÃ GIẢM GIÁ / VOUCHER
    // ========================
    public static final String COUPON_NOT_FOUND_MESSAGE = "Mã giảm giá không tồn tại";
    public static final String COUPON_INVALID_MESSAGE = "Mã giảm giá không hợp lệ";
    public static final String COUPON_EXPIRED_MESSAGE = "Mã giảm giá đã hết hạn";
    public static final String COUPON_ALREADY_USED_MESSAGE = "Mã giảm giá đã được sử dụng";
    public static final String COUPON_USAGE_LIMIT_REACHED_MESSAGE = "Mã giảm giá đã đạt giới hạn sử dụng";
    public static final String COUPON_MIN_ORDER_NOT_MET_MESSAGE = "Đơn hàng chưa đạt giá trị tối thiểu để áp dụng mã giảm giá";
    public static final String COUPON_APPLIED_SUCCESS_MESSAGE = "Áp dụng mã giảm giá thành công";
    public static final String COUPON_CREATED_SUCCESS_MESSAGE = "Tạo mã giảm giá thành công";
    public static final String COUPON_ALREADY_EXISTS_MESSAGE = "Mã giảm giá đã tồn tại";

    // ========================
    // ĐỊA CHỈ
    // ========================
    public static final String ADDRESS_NOT_FOUND_MESSAGE = "Địa chỉ không tồn tại";
    public static final String ADDRESS_CREATED_SUCCESS_MESSAGE = "Thêm địa chỉ thành công";
    public static final String ADDRESS_UPDATED_SUCCESS_MESSAGE = "Cập nhật địa chỉ thành công";
    public static final String ADDRESS_DELETED_SUCCESS_MESSAGE = "Xóa địa chỉ thành công";
    public static final String ADDRESS_SET_DEFAULT_SUCCESS_MESSAGE = "Đặt địa chỉ mặc định thành công";
    public static final String ADDRESS_LIMIT_REACHED_MESSAGE = "Bạn đã đạt giới hạn số lượng địa chỉ";

    // ========================
    // ĐÁNH GIÁ SẢN PHẨM
    // ========================
    public static final String REVIEW_NOT_FOUND_MESSAGE = "Đánh giá không tồn tại";
    public static final String REVIEW_CREATED_SUCCESS_MESSAGE = "Gửi đánh giá thành công";
    public static final String REVIEW_UPDATED_SUCCESS_MESSAGE = "Cập nhật đánh giá thành công";
    public static final String REVIEW_DELETED_SUCCESS_MESSAGE = "Xóa đánh giá thành công";
    public static final String REVIEW_ALREADY_EXISTS_MESSAGE = "Bạn đã đánh giá sản phẩm này rồi";
    public static final String REVIEW_NOT_PURCHASED_MESSAGE = "Bạn cần mua sản phẩm trước khi đánh giá";

    // ========================
    // UPLOAD FILE / HÌNH ẢNH
    // ========================
    public static final String FILE_UPLOAD_SUCCESS_MESSAGE = "Tải lên file thành công";
    public static final String FILE_UPLOAD_FAILED_MESSAGE = "Tải lên file thất bại";
    public static final String FILE_NOT_FOUND_MESSAGE = "File không tồn tại";
    public static final String FILE_SIZE_EXCEEDED_MESSAGE = "Kích thước file vượt quá giới hạn cho phép";
    public static final String FILE_TYPE_NOT_SUPPORTED_MESSAGE = "Định dạng file không được hỗ trợ";
    public static final String FILE_DELETED_SUCCESS_MESSAGE = "Xóa file thành công";
    public static final String IMAGE_NOT_NULL_MESSAGE = "Hình ảnh không được để trống";

    // ========================
    // CHUNG
    // ========================
    public static final String SUCCESS_MESSAGE = "Thao tác thành công";
    public static final String FAILED_MESSAGE = "Thao tác thất bại";
    public static final String INVALID_REQUEST_MESSAGE = "Yêu cầu không hợp lệ";
    public static final String DATA_NOT_FOUND_MESSAGE = "Không tìm thấy dữ liệu";
    public static final String INTERNAL_SERVER_ERROR_MESSAGE = "Lỗi hệ thống, vui lòng thử lại sau";
    public static final String BAD_REQUEST_MESSAGE = "Dữ liệu đầu vào không hợp lệ";
    public static final String DUPLICATE_DATA_MESSAGE = "Dữ liệu đã tồn tại";
    public static final String VALIDATION_ERROR_MESSAGE = "Dữ liệu không hợp lệ, vui lòng kiểm tra lại";
    public static final String NO_CONTENT_MESSAGE = "Không có dữ liệu";

    // ========================
    // I - INTERNAL / INFO CODES
    // ========================
    public static final String I_HOODIE_001 = "I.HOODIE.001";
    public static final String I_HOODIE_002 = "I.HOODIE.002";
    public static final String I_HOODIE_003 = "I.HOODIE.003";
    public static final String I_HOODIE_004 = "I.HOODIE.004";
    public static final String I_HOODIE_005 = "I.HOODIE.005";
    public static final String I_HOODIE_006 = "I.HOODIE.006";
    public static final String I_HOODIE_007 = "I.HOODIE.007";
    public static final String I_HOODIE_008 = "I.HOODIE.008";
    public static final String I_HOODIE_009 = "I.HOODIE.009";
    public static final String I_HOODIE_010 = "I.HOODIE.010";

    // ========================
    // E - ERROR CODES
    // ========================
    public static final String E_HOODIE_001 = "E.HOODIE.001";
    public static final String E_HOODIE_002 = "E.HOODIE.002";
    public static final String E_HOODIE_003 = "E.HOODIE.003";
    public static final String E_HOODIE_004 = "E.HOODIE.004";
    public static final String E_HOODIE_005 = "E.HOODIE.005";
    public static final String E_HOODIE_006 = "E.HOODIE.006";
    public static final String E_HOODIE_007 = "E.HOODIE.007";
    public static final String E_HOODIE_008 = "E.HOODIE.008";
    public static final String E_HOODIE_009 = "E.HOODIE.009";
    public static final String E_HOODIE_010 = "E.HOODIE.010";

    // ========================
    // HOODIE - CODES MASTER
    // ========================
    public static final String HOODIE_CODE_000113 = "HOODIE.CODE.000113";
}
