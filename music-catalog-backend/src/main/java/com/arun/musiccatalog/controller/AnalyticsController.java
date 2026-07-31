package com.arun.musiccatalog.controller;

import com.arun.musiccatalog.dto.ApiResponse;
import com.arun.musiccatalog.dto.analytics.AnalyticsResponse;
import com.arun.musiccatalog.service.AnalyticsService;
import com.arun.musiccatalog.service.FirebaseAuthService;
import java.util.concurrent.ExecutionException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;


    @GetMapping
public ApiResponse<AnalyticsResponse> getAnalytics(
        HttpServletRequest request
)
        throws ExecutionException, InterruptedException {

    Authentication authentication =
        SecurityContextHolder.getContext().getAuthentication();

String userId = authentication.getName();

    AnalyticsResponse analytics =
            analyticsService.getAnalytics(userId);

    return new ApiResponse<>(
            true,
            "Analytics fetched successfully",
            analytics
    );
}
}