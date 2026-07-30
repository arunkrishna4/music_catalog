package com.arun.musiccatalog.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;



@Data
public class CreateAlbumRequest {

    @NotBlank(message = "Apple Catalog ID is required")
    private String appleCatalogId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Artist name is required")
    private String artistName;

    @NotBlank(message = "Genre is required")
    private String genre;

    private String releaseDate;

    private Integer trackCount;

    private String artworkUrl;

    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer userRating;

    private String userNotes;
}