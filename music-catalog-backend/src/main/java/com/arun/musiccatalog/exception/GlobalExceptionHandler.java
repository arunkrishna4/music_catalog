package com.arun.musiccatalog.exception;

import com.arun.musiccatalog.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.arun.musiccatalog.exception.DuplicateAlbumException;
import org.springframework.http.HttpStatus;



@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(UnauthorizedException.class)
public ResponseEntity<ApiResponse<Object>> handleUnauthorized(UnauthorizedException ex) {

    ApiResponse<Object> response =
            new ApiResponse<>(
                    false,
                    ex.getMessage(),
                    null
            );

    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
}

        @ExceptionHandler(DuplicateAlbumException.class)
public ResponseEntity<ApiResponse<Void>> handleDuplicateAlbum(
        DuplicateAlbumException ex
) {

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(
                    new ApiResponse<>(
                            false,
                            ex.getMessage(),
                            null
                    )
            );
}

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex){

        ApiResponse<Object> response =
                new ApiResponse<>(
                        false,
                        ex.getMessage(),
                        null
                );

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    

}