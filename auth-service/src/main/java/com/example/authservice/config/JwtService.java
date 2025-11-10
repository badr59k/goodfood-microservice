package com.example.authservice.config;

import com.example.authservice.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final PrivateKey privateKey=RsaKeyProvider.getPrivateKey();

    private static final PublicKey publicKey=RsaKeyProvider.getPublicKey();

    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    public String generateToken(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        return Jwts.builder()
                .setClaims(generateExtraClaims(extraClaims,user))
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME ))
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }

    private Map<String, Object> generateExtraClaims(Map<String, Object> extraClaims, User user) {
        // extraClaims.put("nationalite", user.getNationalite());
        return new HashMap<String, Object>() {};
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimResolver ){
        final Claims claims =  extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    public  Boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return  (username.equals(userDetails.getUsername())&&!isTokenExpired(token));
    }

    public  Boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }
}
