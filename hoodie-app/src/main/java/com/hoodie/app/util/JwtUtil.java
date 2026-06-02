/**
 * @tbe duynguyen © 2025
 */
package com.hoodie.app.util;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.response.error.ValidationErrorItem;
import com.hoodie.app.exception.UnauthorizedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * JwtUtil class
 */
@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, accessTokenExpiration, "access");
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, refreshTokenExpiration, "refresh");
    }

    private String generateToken(UserDetails userDetails, long expiration, String tokenType) {
        Map<String, Object> claims = new HashMap<>();
//        claims.put("roles", userDetails.getAuthorities());
        claims.put("roles", userDetails.getAuthorities().stream().map(authority -> authority.getAuthority()).toList());
        claims.put("token_type", tokenType);
        claims.put("jti", UUID.randomUUID().toString());
        return Jwts.builder().claims(claims).subject(userDetails.getUsername()).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration)).signWith(getSigningKey()).compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractTokenType(String token) {
        return extractAllClaims(token).get("token_type", String.class);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isRefreshToken(String token) {
        return "refresh".equals(extractTokenType(token));
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException ex) {
            throw new UnauthorizedException(
                    List.of(new ValidationErrorItem(Constant.E_HOODIE_002, Constant.TOKEN_EXPIRED_MESSAGE)));
        } catch (JwtException ex) {
            throw new UnauthorizedException(
                    List.of(new ValidationErrorItem(Constant.E_HOODIE_001, Constant.TOKEN_INVALID_MESSAGE)));
        }
    }
}