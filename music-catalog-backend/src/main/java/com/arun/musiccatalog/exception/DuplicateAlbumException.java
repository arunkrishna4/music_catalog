package com.arun.musiccatalog.exception;

public class DuplicateAlbumException extends RuntimeException {

    public DuplicateAlbumException(String message) {
        super(message);
    }
}