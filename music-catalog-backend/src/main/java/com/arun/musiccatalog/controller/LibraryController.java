package com.arun.musiccatalog.controller;

import com.arun.musiccatalog.dto.CreateAlbumRequest;
import com.arun.musiccatalog.entity.Album;
import com.arun.musiccatalog.dto.ApiResponse;
import com.arun.musiccatalog.service.AlbumService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.arun.musiccatalog.dto.UpdateAlbumRequest;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final AlbumService albumService;

    public LibraryController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Album>> createAlbum(
            @Valid @RequestBody CreateAlbumRequest request,
            Authentication authentication
    ) throws Exception {

        Album album = albumService.createAlbum(
                request,
                authentication.getName()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Album created successfully",
                        album
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Album>>> getAllAlbums(Authentication authentication) throws Exception {

        List<Album> albums = albumService.getAllAlbums(authentication.getName());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Albums fetched successfully",
                        albums
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Album>> getAlbumById(
            @PathVariable String id
    ) throws Exception {

        Album album = albumService.getAlbumById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Album fetched successfully",
                        album
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Album>> updateAlbum(
        @PathVariable String id,
        @Valid @RequestBody UpdateAlbumRequest request,
        Authentication authentication
    ) throws Exception {

        Album album = albumService.updateAlbum(
            id,
            request,
            authentication.getName()
        );

        return ResponseEntity.ok(
            new ApiResponse<>(
                        true,
                        "Album updated successfully",
                        album
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAlbum(@PathVariable String id) throws Exception {

        albumService.deleteAlbum(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Album deleted successfully",
                        null
                )
        );
    }
}