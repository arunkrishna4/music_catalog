package com.arun.musiccatalog.controller;

import com.arun.musiccatalog.dto.ApiResponse;
import com.arun.musiccatalog.dto.ai.AIResponse;
import com.arun.musiccatalog.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/recommendations")
    public ApiResponse<AIResponse> getRecommendations(
            Authentication authentication)
            throws Exception {

        String userId = authentication.getName();

        AIResponse response =
                aiService.generateRecommendations(userId);

        return new ApiResponse<>(
                true,
                "Recommendations generated successfully",
                response
        );
    }
}