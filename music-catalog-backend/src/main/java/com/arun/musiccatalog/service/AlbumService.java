package com.arun.musiccatalog.service;

import com.arun.musiccatalog.dto.CreateAlbumRequest;
import com.arun.musiccatalog.entity.Album;
import com.arun.musiccatalog.repository.AlbumRepository;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import org.springframework.stereotype.Service;
import com.arun.musiccatalog.exception.ResourceNotFoundException;
import com.arun.musiccatalog.dto.UpdateAlbumRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    //creating album
    public Album createAlbum(CreateAlbumRequest request, String userId) throws Exception {

        Album album = Album.builder()
        .appleCatalogId(request.getAppleCatalogId())
        .title(request.getTitle())
        .artistName(request.getArtistName())
        .genre(request.getGenre())
        .releaseDate(request.getReleaseDate())
        .trackCount(request.getTrackCount())
        .artworkUrl(request.getArtworkUrl())
        .userRating(request.getUserRating())
        .userNotes(request.getUserNotes())
        .userId(userId)
        .createdAt(new Date())
        .updatedAt(new Date())
        .build();
        return albumRepository.save(album);
    }

    //fetching album by id
    public Album getAlbumById(String id) throws Exception {


        Album album = albumRepository.findById(id);

        if (album == null) {
            throw new ResourceNotFoundException("Album not found");
        }

        return album;
    }

    //fetching all albums
    public List<Album> getAllAlbums(String userId) throws Exception {

        List<QueryDocumentSnapshot> documents =
        albumRepository.findAllByUserId(userId);

        List<Album> albums = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            albums.add(document.toObject(Album.class));
        }

        return albums;
    }

    //updating an album
    public Album updateAlbum(
        String id,
        UpdateAlbumRequest request,
        String userId
    ) throws Exception {

        Album album = albumRepository.findById(id);

        if (album == null) {
            throw new ResourceNotFoundException("Album not found");
        }

        // Prevent users from updating someone else's album
        if (!album.getUserId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this album");
        }

        album.setAppleCatalogId(request.getAppleCatalogId());
        album.setTitle(request.getTitle());
        album.setArtistName(request.getArtistName());
        album.setGenre(request.getGenre());
        album.setReleaseDate(request.getReleaseDate());
        album.setTrackCount(request.getTrackCount());
        album.setArtworkUrl(request.getArtworkUrl());
        album.setUserRating(request.getUserRating());
        album.setUserNotes(request.getUserNotes());
        album.setUpdatedAt(new Date());

        return albumRepository.update(album);
    }

    //deleting an album
    public void deleteAlbum(String id) throws Exception {
        albumRepository.delete(id);
    }
}