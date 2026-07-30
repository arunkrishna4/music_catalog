package com.arun.musiccatalog.dto;

import lombok.Data;

import java.util.List;

@Data
public class ItunesSearchResponse {

    private Integer resultCount;

    private List<ItunesResult> results;
}