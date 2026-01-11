/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hoodie.app.filter.JwtAuthenticationFilter;

/**
 * SecurityConfig class
 */
@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/product/search").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/category/search").permitAll().anyRequest()
                        .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Danh sách origin frontend được phép (dev)
        config.setAllowedOrigins(List.of("http://localhost:5173", // Vite default port
                "http://localhost:3000", // Nếu dùng Create-React-App hoặc port khác
                "http://localhost:8080" // Nếu có port khác
        // Thêm domain production sau: "https://your-frontend-domain.com"
        ));

        // Methods được phép
        // config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS",
        // "HEAD"));
        config.setAllowedMethods(List.of("POST"));

        // Headers được phép (Authorization cho JWT, Content-Type, v.v.)
        config.setAllowedHeaders(List.of("*"));

        // Nếu frontend dùng withCredentials: true → phải bật cái này
        // (nhưng vì bạn dùng JWT Bearer token, thường KHÔNG cần withCredentials)
        config.setAllowCredentials(true);

        // Expose headers nếu cần (ví dụ Access-Control-Expose-Headers)
        // config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Áp dụng cho tất cả path

        return source;
    }
}
