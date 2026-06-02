/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.common;

import java.util.Collection;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * CheckLogic - Utility class for common validation checks. Provides static
 * methods for null, empty, format, and range validations.
 */
public class CheckLogic {

    private static final String CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL = "01";
    private static final String CONSTANT_SUBMIT_REQUEST_TYPE_CREATE = "02";
    private static final String CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE = "03";

    // ==================== REGEX PATTERNS ====================

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    private static final Pattern PHONE_PATTERN = Pattern.compile("^(\\+?84|0)[3|5|7|8|9][0-9]{8}$"); // VN phone format

    private static final Pattern UUID_PATTERN = Pattern
            .compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

    private static final Pattern NUMERIC_PATTERN = Pattern.compile("^-?\\d+(\\.\\d+)?$");

    private static final Pattern ALPHANUMERIC_PATTERN = Pattern.compile("^[a-zA-Z0-9]+$");

    private static final Pattern URL_PATTERN = Pattern.compile("^(https?|ftp)://[^\\s/$.?#].[^\\s]*$");

    private CheckLogic() {
        // Utility class - prevent instantiation
    }

    // ==================== NULL CHECKS ====================

    /**
     * Checks if an object is null.
     */
    public static boolean isNull(Object obj) {
        return obj == null;
    }

    /**
     * Checks if an object is not null.
     */
    public static boolean isNotNull(Object obj) {
        return obj != null;
    }

    /**
     * Throws IllegalArgumentException if object is null.
     */
    public static void requireNonNull(Object obj, String fieldName) {
        if (obj == null) {
            throw new IllegalArgumentException(fieldName + " must not be null");
        }
    }

    // ==================== STRING CHECKS ====================

    /**
     * Checks if a String is null or empty ("").
     */
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    /**
     * Checks if a String is null, empty, or contains only whitespace.
     */
    public static boolean isBlank(String str) {
        return str == null || str.isBlank();
    }

    /**
     * Checks if a String is not null and not empty.
     */
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    /**
     * Checks if a String is not null, not empty, and not blank.
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }

    /**
     * Checks if a String length is within [min, max] range.
     */
    public static boolean isLengthBetween(String str, int min, int max) {
        if (str == null)
            return false;
        int len = str.trim().length();
        return len >= min && len <= max;
    }

    /**
     * Checks if a String does not exceed max length.
     */
    public static boolean isLengthValid(String str, int maxLength) {
        if (str == null)
            return false;
        return str.length() <= maxLength;
    }

    // ==================== COLLECTION CHECKS ====================

    /**
     * Checks if a Collection is null or empty.
     */
    public static boolean isEmpty(Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    /**
     * Checks if a Collection is not null and not empty.
     */
    public static boolean isNotEmpty(Collection<?> collection) {
        return !isEmpty(collection);
    }

    /**
     * Checks if a Map is null or empty.
     */
    public static boolean isEmpty(Map<?, ?> map) {
        return map == null || map.isEmpty();
    }

    /**
     * Checks if an array is null or empty.
     */
    public static <T> boolean isEmpty(T[] array) {
        return array == null || array.length == 0;
    }

    /**
     * Checks if a Map is not null and not empty.
     */
    public static boolean isNotEmpty(Map<?, ?> map) {
        return !isEmpty(map);
    }

    // ==================== NUMERIC CHECKS ====================

    /**
     * Checks if a number is positive (> 0).
     */
    public static boolean isPositive(Number number) {
        if (number == null)
            return false;
        return number.doubleValue() > 0;
    }

    /**
     * Checks if a number is non-negative (>= 0).
     */
    public static boolean isNonNegative(Number number) {
        if (number == null)
            return false;
        return number.doubleValue() >= 0;
    }

    /**
     * Checks if a number is within [min, max] range (inclusive).
     */
    public static boolean isInRange(Number number, double min, double max) {
        if (number == null)
            return false;
        double val = number.doubleValue();
        return val >= min && val <= max;
    }

    /**
     * Checks if a String represents a valid numeric value.
     */
    public static boolean isNumeric(String str) {
        if (isBlank(str))
            return false;
        return NUMERIC_PATTERN.matcher(str.trim()).matches();
    }

    // ==================== FORMAT / REGEX CHECKS ====================

    /**
     * Checks if an email address is valid.
     */
    public static boolean isValidEmail(String email) {
        if (isBlank(email))
            return false;
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    /**
     * Checks if a Vietnamese phone number is valid.
     */
    public static boolean isValidPhone(String phone) {
        if (isBlank(phone))
            return false;
        return PHONE_PATTERN.matcher(phone.trim()).matches();
    }

    /**
     * Checks if a String is a valid UUID format.
     */
    public static boolean isValidUUID(String uuid) {
        if (isBlank(uuid))
            return false;
        return UUID_PATTERN.matcher(uuid.trim()).matches();
    }

    /**
     * Checks if a String contains only alphanumeric characters.
     */
    public static boolean isAlphanumeric(String str) {
        if (isBlank(str))
            return false;
        return ALPHANUMERIC_PATTERN.matcher(str).matches();
    }

    /**
     * Checks if a String is a valid URL.
     */
    public static boolean isValidUrl(String url) {
        if (isBlank(url))
            return false;
        return URL_PATTERN.matcher(url.trim()).matches();
    }

    /**
     * Checks if a String matches a given regex pattern.
     */
    public static boolean matchesPattern(String str, String regex) {
        if (isBlank(str) || isBlank(regex))
            return false;
        return Pattern.matches(regex, str);
    }

    // ==================== ID / KEY CHECKS ====================

    /**
     * Checks if a Long ID is valid (not null and > 0).
     */
    public static boolean isValidId(Long id) {
        return id != null && id > 0;
    }

    /**
     * Checks if an Integer ID is valid (not null and > 0).
     */
    public static boolean isValidId(Integer id) {
        return id != null && id > 0;
    }

    /**
     * Checks if a String key/token is valid (not blank).
     */
    public static boolean isValidKey(String key) {
        return isNotBlank(key);
    }

    // ==================== BOOLEAN HELPERS ====================

    /**
     * Checks if a Boolean value is explicitly true.
     */
    public static boolean isTrue(Boolean value) {
        return Boolean.TRUE.equals(value);
    }

    /**
     * Checks if a Boolean value is explicitly false or null.
     */
    public static boolean isFalse(Boolean value) {
        return !Boolean.TRUE.equals(value);
    }

    // ==================== OBJECT EQUALITY ====================

    /**
     * Null-safe equality check between two objects.
     */
    public static boolean isEqual(Object a, Object b) {
        if (a == null && b == null)
            return true;
        if (a == null || b == null)
            return false;
        return a.equals(b);
    }

    /**
     * Null-safe inequality check between two objects.
     */
    public static boolean isNotEqual(Object a, Object b) {
        return !isEqual(a, b);
    }

    // ==================== OTHERS ====================

    /**
     * Null-safe inequality check between two objects.
     */
    public static boolean isSubmitEntry(String requestType) {
        if (requestType.equals(CONSTANT_SUBMIT_REQUEST_TYPE_CREATE)) {
            return true;
        } else {
            return false;
        }
    }
}