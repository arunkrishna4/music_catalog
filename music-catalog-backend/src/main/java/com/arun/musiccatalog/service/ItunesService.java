package com.arun.musiccatalog.service;

import com.arun.musiccatalog.dto.ItunesSearchResponse;
import com.arun.musiccatalog.dto.ItunesResult;
import com.arun.musiccatalog.dto.SearchResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItunesService {

    private final RestClient restClient;

    public ItunesService() {
        this.restClient = RestClient.create("https://itunes.apple.com");
    }

    public List<SearchResult> search(String query, String type) throws Exception{

        String entity;

        if ("artist".equalsIgnoreCase(type)) {
    entity = "album";
} else if ("song".equalsIgnoreCase(type)) {
            entity = "song";
        } else {
            entity = "album";
        }

        String json = restClient.get()
        .uri(uriBuilder -> uriBuilder
                .path("/search")
                .queryParam("term", query)
                .queryParam("entity", entity)
                .build())
        .accept(MediaType.ALL)
        .retrieve()
        .body(String.class);

ObjectMapper mapper = new ObjectMapper();

ItunesSearchResponse response =
        mapper.readValue(json, ItunesSearchResponse.class);

        List<SearchResult> results = new ArrayList<>();

        if (response == null || response.getResults() == null) {
            return results;
        }

        for (ItunesResult item : response.getResults()) {

            SearchResult result = new SearchResult();

           if (item.getCollectionId() != null) {
    result.setAppleCatalogId(item.getCollectionId().toString());
} else if (item.getTrackId() != null) {
    result.setAppleCatalogId(item.getTrackId().toString());
}

            result.setTitle(
                    item.getCollectionName() != null
                            ? item.getCollectionName()
                            : item.getTrackName()
            );

            result.setArtistName(item.getArtistName());
            result.setGenre(item.getPrimaryGenreName());
            result.setArtworkUrl(item.getArtworkUrl100());
            result.setReleaseDate(item.getReleaseDate());
            result.setTrackCount(item.getTrackCount());

            results.add(result);
        }

        return results;
    }
}