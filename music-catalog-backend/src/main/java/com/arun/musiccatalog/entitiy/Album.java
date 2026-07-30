package com.arun.musiccatalog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    private String id;

    private String appleCatalogId;

    private String title;

    private String artistName;

    private String genre;

    private String releaseDate;

    private Integer trackCount;

    private String artworkUrl;

    private Integer userRating;

    private String userNotes;

    private String userId;

    private Date createdAt;
    
    private Date updatedAt;
}