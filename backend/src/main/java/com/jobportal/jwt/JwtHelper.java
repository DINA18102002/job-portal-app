package com.jobportal.jwt;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component 
public class JwtHelper {

    private static final String SECRET_KEY = "eIAgx9ZyYd05P4p6V7WaluWOE2UjoQy57Wxe2ArhbfKTr6OgQTdF1WdMGYPKGXqS\r\n"
    		+ "Zeyy4gWsWhNKx4NIM822Gw=="; // Use Base64 encoded 512-bit key
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Generate token
    public static String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate token
    public static boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    // Extract username
    public static String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Check if token is expired
    public static boolean isTokenExpired(String token) {
        final Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    // Extract single claim
    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims
    private static Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
}
