package com.arun.musiccatalog.controller;

import com.arun.musiccatalog.dto.SearchResult;
import com.arun.musiccatalog.dto.ApiResponse;
import com.arun.musiccatalog.service.ItunesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final ItunesService itunesService;

    public SearchController(ItunesService itunesService) {
        this.itunesService = itunesService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SearchResult>>> search(
            @RequestParam String query,
            @RequestParam String type
    ) throws Exception {

        List<SearchResult> results = itunesService.search(query, type);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Search completed successfully",
                        results
                )
        );
    }
}