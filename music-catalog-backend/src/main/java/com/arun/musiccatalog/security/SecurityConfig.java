package com.arun.musiccatalog.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    private final FirebaseAuthenticationFilter firebaseAuthenticationFilter;

    public SecurityConfig(FirebaseAuthenticationFilter firebaseAuthenticationFilter) {
        this.firebaseAuthenticationFilter = firebaseAuthenticationFilter;
    }

   @Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
    .cors(Customizer.withDefaults())

    .csrf(csrf -> csrf.disable())

    .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    )

    .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/health").permitAll()
            .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
            .anyRequest().authenticated()
    )

    .httpBasic(httpBasic -> httpBasic.disable())

    .formLogin(form -> form.disable())

    .addFilterBefore(
            firebaseAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class
    );

    return http.build();
}
}