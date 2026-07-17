/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CheckoutSubmitApplicationModel;
import com.hoodie.app.config.VNPayProperties;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.constant.OrderStatus;
import com.hoodie.app.constant.PaymentStatus;
import com.hoodie.app.dto.SubmitPaymentResponseModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.entity.Order;
import com.hoodie.app.entity.OrderItem;
import com.hoodie.app.entity.Payment;
import com.hoodie.app.entity.Product;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.OrderItemRepository;
import com.hoodie.app.repository.OrderRepository;
import com.hoodie.app.repository.PaymentRepository;
import com.hoodie.app.repository.ProductRepository;
import com.hoodie.app.service.PaymentService;
import com.hoodie.app.util.VNPayUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

/**
 * PaymentServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    /**
     * VNPayProperties
     */
    @Autowired
    private VNPayProperties properties;

    /**
     * PaymentRepository
     */
    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * OrderRepository
     */
    @Autowired
    private OrderRepository orderRepository;

    /**
     * OrderItemRepository
     */
    @Autowired
    private OrderItemRepository orderItemRepository;

    /**
     * ProductRepository
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * submit
     */
    @Override
    public SubmitPaymentResponseModel submit(User currentUser, HttpServletRequest servletRequest,
            SubmitRequestModel<CheckoutSubmitApplicationModel> request) {
        CheckoutSubmitApplicationModel model = request.getModel();

        Order order = orderRepository.findById(model.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found."));

        Payment payment = new Payment();
        payment.setOrderId(order.getOrderId());
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(model.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.UNPAID.name().toLowerCase());
        payment.setDeleteFlag(Constant.DELETE_FLAG_ZERO);
        paymentRepository.save(payment);

        String paymentUrl = createPaymentUrl(order, payment, servletRequest);

        SubmitPaymentResponseModel response = new SubmitPaymentResponseModel();
        response.setCode(Constant.NO_ERROR);
        response.setMessage(Constant.INFO_SUCCESS);
        response.setOrderId(order.getOrderId());
//        response.setPaymentId(payment.getPaymentId());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setPaymentUrl(paymentUrl);
        return response;
    }

    /**
     * processCallback
     * 
     * @param request
     */
    public void processCallback(HttpServletRequest request) {
        Map<String, String[]> params = request.getParameterMap();

        if (!verifySecureHash(params)) {
            throw new IllegalArgumentException("VNPay SecureHash invalid.");
        }

        Integer paymentId = getPaymentId(params);

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found."));

        if ("paid".equalsIgnoreCase(payment.getPaymentStatus())) {
            return;
        }

        Order order = orderRepository.findById(payment.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Amount."));

        BigDecimal callbackAmount = getAmount(params);

        if (order.getTotalAmount().compareTo(callbackAmount) != 0) {
            throw new IllegalArgumentException("Amount mismatch.");
        }

        /*
         * Payment Success
         */
        if (isSuccess(params)) {
            paymentSuccess(payment, params);
            orderSuccess(order);
            // reduceStock(order);
            // clearCart(order.getUser());
        } else {
            paymentFailed(payment, params);
        }
    }

    /**
     * paymentSuccess
     * 
     * @param payment
     * @param params
     */
    private void paymentSuccess(Payment payment, Map<String, String[]> params) {
        payment.setPaymentStatus("paid");
        payment.setTransactionRef(getTransactionNo(params));
        payment.setGatewayResponse(getResponseCode(params));
        payment.setPaidAt(OffsetDateTime.now());
        paymentRepository.save(payment);
    }

    /**
     * paymentFailed
     * 
     * @param payment
     * @param params
     */
    private void paymentFailed(Payment payment, Map<String, String[]> params) {
        payment.setPaymentStatus("failed");
        payment.setGatewayResponse(getResponseCode(params));
        paymentRepository.save(payment);
    }

    /**
     * orderSuccess
     * 
     * @param order
     */
    private void orderSuccess(Order order) {
        order.setOrderStatus("confirmed");
        orderRepository.save(order);
    }

    /**
     * reduceStock
     * 
     * @param order
     */
    private void reduceStock(Order order) {
        List<OrderItem> listItems = orderItemRepository.findByOrderIdAndDeleteFlag(order.getOrderId(),
                Constant.DELETE_FLAG_ZERO);
        for (OrderItem item : listItems) {
            Product product = productRepository.findByProductIdAndDeleteFlag(item.getProductId(),
                    Constant.DELETE_FLAG_ZERO);
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new IllegalStateException("Product out of stock.");
            }
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
        }
    }

    /**
     * Tạo URL thanh toán VNPay
     */
    public String createPaymentUrl(Order order, Payment payment, HttpServletRequest request) {
        Map<String, String> params = new TreeMap<>();
        params.put("vnp_Version", properties.getVersion());
        params.put("vnp_Command", properties.getCommand());
        params.put("vnp_TmnCode", properties.getTmnCode());

        /*
         * VNPay yêu cầu amount * 100
         */
        long amount = order.getTotalAmount().multiply(BigDecimal.valueOf(100)).longValue();

        params.put("vnp_Amount", String.valueOf(amount));
        params.put("vnp_CurrCode", properties.getCurrCode());
        params.put("vnp_TxnRef", payment.getPaymentId().toString());
        params.put("vnp_OrderInfo", "Thanh_toan_don_hang_" + order.getOrderId());
        params.put("vnp_OrderType", properties.getOrderType());
        params.put("vnp_Locale", properties.getLocale());
        params.put("vnp_ReturnUrl", properties.getReturnUrl());
        params.put("vnp_IpAddr", getClientIp(request));

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT+7"));

        params.put("vnp_CreateDate", formatter.format(calendar.getTime()));

        calendar.add(Calendar.MINUTE, 15);

        params.put("vnp_ExpireDate", formatter.format(calendar.getTime()));

        String hashData = VNPayUtil.buildHashData(params);
        String query = VNPayUtil.buildQuery(params);
        String secureHash = VNPayUtil.hmacSHA512(properties.getHashSecret(), hashData);

        return properties.getPayUrl() + "?" + query + "&vnp_SecureHash=" + secureHash;
    }

    /**
     * Lấy IP Client
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-FORWARDED-FOR");
        if (ip == null || ip.isBlank()) {
            ip = request.getRemoteAddr();
        }
        if ("0:0:0:0:0:0:0:1".equals(ip)) {
            return "127.0.0.1";
        }
        return ip;
    }

    /**
     * Verify chữ ký VNPay
     */
    public boolean verifySecureHash(Map<String, String[]> parameterMap) {
        Map<String, String> fields = new TreeMap<>();
        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            String key = entry.getKey();
            if (key.equals("vnp_SecureHash"))
                continue;
            if (key.equals("vnp_SecureHashType"))
                continue;
            String value = entry.getValue()[0];
            if (value != null && !value.isBlank()) {
                fields.put(key, value);
            }
        }
        String hashData = VNPayUtil.buildHashData(fields);
        String localHash = VNPayUtil.hmacSHA512(properties.getHashSecret(), hashData);
        String vnpHash = parameterMap.get("vnp_SecureHash")[0];
        return localHash.equalsIgnoreCase(vnpHash);
    }

    /**
     * Helper lấy ResponseCode
     */
    public String getResponseCode(Map<String, String[]> params) {
        return params.get("vnp_ResponseCode")[0];
    }

    /**
     * Helper TransactionNo
     */
    public String getTransactionNo(Map<String, String[]> params) {
        return params.get("vnp_TransactionNo")[0];
    }

    /*
     * Helper PaymentId: payment_id = vnp_TxnRef
     */
    public Integer getPaymentId(Map<String, String[]> params) {
        return Integer.parseInt(params.get("vnp_TxnRef")[0]);
    }

    /*
     * Helper Amount
     */
    public BigDecimal getAmount(Map<String, String[]> params) {
        long amount = Long.parseLong(params.get("vnp_Amount")[0]);
        return BigDecimal.valueOf(amount).divide(BigDecimal.valueOf(100));
    }

    /**
     * Helper Check Success
     */
    public boolean isSuccess(Map<String, String[]> params) {
        return "00".equals(getResponseCode(params));
    }

    /*
     * Helper BankCode
     */
    public String getBankCode(Map<String, String[]> params) {
        return params.get("vnp_BankCode")[0];
    }

    /*
     * Helper PayDate
     */
    public Date getPayDate(Map<String, String[]> params) throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        return format.parse(params.get("vnp_PayDate")[0]);
    }

    /**
     * processVNPayReturn
     */
    @Override
    public String processVNPayReturn(HttpServletRequest request) {
        // ====================================================
        // 1. Lấy toàn bộ parameter từ VNPay
        // ====================================================
        Map<String, String> fields = new HashMap<>();
        request.getParameterMap().forEach((key, value) -> {
            if (value != null && value.length > 0) {
                fields.put(key, value[0]);
            }
        });

        // ====================================================
        // 2. Verify Secure Hash
        // ====================================================
        verifySecureHashCallback(fields);

        // ====================================================
        // 3. Lấy Payment
        // ====================================================
        Integer paymentId = Integer.valueOf(fields.get("vnp_TxnRef"));
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found."));

        // ====================================================
        // 4. Đã xử lý rồi thì không xử lý nữa
        // ====================================================
        if (PaymentStatus.PAID.equals(payment.getPaymentStatus().toUpperCase())) {
            return buildSuccessRedirectUrlCallBack(payment.getOrderId());
        }

        // ====================================================
        // 5. Kiểm tra kết quả thanh toán
        // ====================================================
        String responseCode = fields.get("vnp_ResponseCode");
        if (!"00".equals(responseCode)) {
            processPaymentFailCallBack(payment, fields);
            return buildFailRedirectUrlCallBack(payment.getOrderId());
        }

        // ====================================================
        // 6. Thành công
        // ====================================================
        processPaymentSuccessCallBack(payment, fields);

        return buildSuccessRedirectUrlCallBack(payment.getOrderId());
    }

    private void verifySecureHashCallback(Map<String, String> fields) {
        String secureHash = fields.remove("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        String hashData = VNPayUtil.buildHashData(fields);
        String localHash = VNPayUtil.hmacSHA512(properties.getHashSecret(), hashData);
        if (!localHash.equalsIgnoreCase(secureHash)) {
            throw new RuntimeException("VNPay SecureHash Invalid.");
        }
    }

    private void processPaymentSuccessCallBack(Payment payment, Map<String, String> fields) {
        payment.setPaymentStatus(PaymentStatus.PAID.toString().toLowerCase());
        payment.setTransactionRef(fields.get("vnp_TransactionNo"));
        payment.setGatewayResponse(fields.get("vnp_ResponseCode"));
        payment.setPaidAt(OffsetDateTime.now());
        paymentRepository.save(payment);
        Order order = orderRepository.findById(payment.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found."));
        order.setOrderStatus(OrderStatus.CONFIRMED.toString().toLowerCase());
        orderRepository.save(order);

//        reduceProductStock(order);
//        clearCart(order);
    }

    private void processPaymentFailCallBack(Payment payment, Map<String, String> fields) {
        payment.setPaymentStatus(PaymentStatus.UNPAID.toString().toLowerCase());
        payment.setGatewayResponse(fields.get("vnp_ResponseCode"));
        paymentRepository.save(payment);
    }

    private String frontendUrl = "http://localhost:5173";

    private String buildSuccessRedirectUrlCallBack(Integer orderId) {
        return frontendUrl + "/payment/success?orderId=" + orderId;
    }

    private String buildFailRedirectUrlCallBack(Integer orderId) {
        return frontendUrl + "/payment/fail?orderId=" + orderId;
    }
}
