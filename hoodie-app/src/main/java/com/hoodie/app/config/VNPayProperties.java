/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

/**
 * VNPayProperties class
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "vnpay")
public class VNPayProperties {
    private String tmnCode;

    private String hashSecret;

    private String payUrl;

    private String returnUrl;

    private String version;

    private String command;

    private String orderType;

    private String locale;

    private String currCode;
}
