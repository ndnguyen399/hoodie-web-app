/**
 * @author duynguyen © 2025
 */
package com.hoodie.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.hoodie.app.config.VNPayProperties;

/**
 * HoodieAppApplication class
 */
@SpringBootApplication
@EnableConfigurationProperties(VNPayProperties.class)
public class HoodieAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(HoodieAppApplication.class, args);
    }

}
