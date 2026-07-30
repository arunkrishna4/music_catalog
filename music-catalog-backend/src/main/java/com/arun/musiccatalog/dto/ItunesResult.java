package com.arun.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItunesResult {

    private Long collectionId;

    private Long trackId;

    private String collectionName;

    private String trackName;

    private String artistName;

    private String primaryGenreName;

    private String artworkUrl100;

    private String releaseDate;

    private Integer trackCount;
}