package com.arun.musiccatalog.dto;

import lombok.Data;

@Data
public class SearchResult {

    private String appleCatalogId;

    private String title;

    private String artistName;

    private String genre;

    private String artworkUrl;

    private String releaseDate;

    private Integer trackCount;
}