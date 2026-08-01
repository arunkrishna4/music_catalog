package com.arun.musiccatalog.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import com.arun.musiccatalog.service.FirebaseAuthService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    private final FirebaseAuthService firebaseAuthService;

    public FirebaseAuthenticationFilter(FirebaseAuthService firebaseAuthService) {
        this.firebaseAuthService = firebaseAuthService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        
        
        String header = request.getHeader("Authorization");
        

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {

                FirebaseToken decodedToken =
                        firebaseAuthService.verifyToken(token);

                

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                decodedToken.getUid(),
                                null,
                                Collections.emptyList()
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(e.getMessage());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}