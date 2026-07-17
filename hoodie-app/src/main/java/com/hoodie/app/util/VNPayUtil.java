/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.util;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;

/**
 * VNPayUtil class
 */
public final class VNPayUtil {
//    private VNPayUtil() {
//    }
//
//    public static String buildQuery(Map<String, String> params) {
//
//        return params.entrySet().stream().filter(e -> e.getValue() != null && !e.getValue().isBlank())
//                .map(e -> urlEncode(e.getKey()) + "=" + urlEncode(e.getValue())).collect(Collectors.joining("&"));
//
//    }
//
//    public static String hmacSHA512(String secret, String data) {
//
//        try {
//
//            Mac hmac512 = Mac.getInstance("HmacSHA512");
//
//            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
//
//            hmac512.init(secretKey);
//
//            byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
//
//            return Hex.encodeHexString(bytes);
//
//        } catch (Exception ex) {
//
//            throw new RuntimeException(ex);
//
//        }
//
//    }
//
//    public static TreeMap<String, String> sort(Map<String, String> map) {
//
//        return new TreeMap<>(map);
//
//    }

//    public static String urlEncode(String value) {
//
//        return URLEncoder.encode(value, StandardCharsets.UTF_8).replace("+", "%20");
//
//    }
//    public static String urlEncode(String value) {
//        return URLEncoder.encode(value, StandardCharsets.US_ASCII);
//    }

    private VNPayUtil() {
    }

    /**
     * Tạo chuỗi dữ liệu để hash
     */
    public static String buildHashData(Map<String, String> params) {

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();

        Iterator<String> iterator = fieldNames.iterator();

        while (iterator.hasNext()) {

            String fieldName = iterator.next();
            String fieldValue = params.get(fieldName);

            if (fieldValue != null && !fieldValue.isEmpty()) {

                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (iterator.hasNext()) {
                    hashData.append('&');
                }
            }
        }

        return hashData.toString();
    }

    /**
     * Tạo query string
     */
    public static String buildQuery(Map<String, String> params) {

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder query = new StringBuilder();

        Iterator<String> iterator = fieldNames.iterator();

        while (iterator.hasNext()) {

            String fieldName = iterator.next();
            String fieldValue = params.get(fieldName);

            if (fieldValue != null && !fieldValue.isEmpty()) {

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (iterator.hasNext()) {
                    query.append('&');
                }
            }
        }

        return query.toString();
    }

    public static String hmacSHA512(String key, String data) {

        try {

            Mac mac = Mac.getInstance("HmacSHA512");

            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");

            mac.init(secretKey);

            return Hex.encodeHexString(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));

        } catch (Exception ex) {

            throw new RuntimeException(ex);

        }

    }
}
