package com.arun.musiccatalog.service;

import com.arun.musiccatalog.dto.analytics.*;
import com.arun.musiccatalog.entity.Album;
import com.arun.musiccatalog.dto.analytics.AnalyticsResponse;
import com.arun.musiccatalog.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.google.cloud.firestore.QueryDocumentSnapshot;

import java.util.concurrent.ExecutionException;
import java.util.Map;
import java.util.stream.Collectors;
import java.text.DateFormatSymbols;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AlbumRepository albumRepository;

    //calculating average rating
    private double calculateAverageRating(List<Album> albums) {

        double average = albums.stream()
                .filter(album -> album.getUserRating() != null)
                .mapToInt(Album::getUserRating)
                .average()
                .orElse(0);

        return Math.round(average * 10.0) / 10.0;
    }


    //calculating favorite genre
    private String calculateFavoriteGenre(List<Album> albums) {

        return albums.stream()
                .collect(Collectors.groupingBy(
                        Album::getGenre,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("-");
    }

    //counting unique artists
    private long calculateUniqueArtists(List<Album> albums) {

        return albums.stream()
                .map(Album::getArtistName)
                .distinct()
                .count();
    }

    //calculating genre distribution
    private List<GenreStat> getGenreDistribution(List<Album> albums) {

    return albums.stream()
            .collect(Collectors.groupingBy(
                    Album::getGenre,
                    Collectors.counting()
            ))
            .entrySet()
            .stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .map(entry -> new GenreStat(
                    entry.getKey(),
                    entry.getValue()
            ))
            .toList();
}

    //calculating rating distribution
    private List<RatingStat> getRatingDistribution(List<Album> albums) {

        return albums.stream()
                .filter(album -> album.getUserRating() != null)
                .collect(Collectors.groupingBy(
                        Album::getUserRating,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
            .map(entry -> new RatingStat(
                    entry.getKey(),
                    entry.getValue()
            ))
            .toList();
    }

    //calculating albums per month
    private List<MonthlyStat> getAlbumsPerMonth(List<Album> albums) {

    Map<Integer, Long> counts = albums.stream()
            .filter(album -> album.getCreatedAt() != null)
            .collect(Collectors.groupingBy(album -> {

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(album.getCreatedAt());

                return calendar.get(Calendar.MONTH);

            }, TreeMap::new, Collectors.counting()));

    return counts.entrySet()
            .stream()
            .map(entry -> new MonthlyStat(

                    new DateFormatSymbols().getShortMonths()[entry.getKey()],
                    entry.getValue()

            ))
            .toList();
    }

//calculating releases by year
private List<ReleaseYearStat> getReleaseYearDistribution(List<Album> albums) {

    return albums.stream()
            .filter(album ->
                    album.getReleaseDate() != null &&
                    !album.getReleaseDate().isBlank())
            .collect(Collectors.groupingBy(
                    album -> Integer.parseInt(
                            album.getReleaseDate().substring(0, 4)
                    ),
                    Collectors.counting()
            ))
            .entrySet()
            .stream()
            .sorted(Map.Entry.comparingByKey())
            .map(entry -> new ReleaseYearStat(
                    entry.getKey(),
                    entry.getValue()
            ))
            .toList();
    }

    // Calculating top artists (handles collaborations)
    private List<ArtistStat> getTopArtists(List<Album> albums) {

        return albums.stream()

            // Get the full artist string
            .map(Album::getArtistName)

            // Ignore null values
            .filter(artist -> artist != null && !artist.isBlank())

            // Split collaborations into individual artists
            .flatMap(artist ->
                    java.util.Arrays.stream(
                            artist.split("\\s*(?:,|&|feat\\.|ft\\.|featuring|/| x | X )\\s*")
                    )
            )

            // Remove extra spaces
            .map(String::trim)

            // Ignore empty strings
            .filter(name -> !name.isBlank())

            // Count each artist
            .collect(Collectors.groupingBy(
                    artist -> artist,
                    Collectors.counting()
            ))

            // Sort by count (highest first)
            .entrySet()
            .stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())

            // Top 5
            .limit(5)

            // Convert to DTO
            .map(entry -> new ArtistStat(
                    entry.getKey(),
                    entry.getValue()
            ))
            .toList();
    }

    public AnalyticsResponse getAnalytics(String userId)
        throws ExecutionException, InterruptedException {

    List<QueryDocumentSnapshot> documents =
            albumRepository.findAllByUserId(userId);

    List<Album> albums = documents.stream()
            .map(document -> document.toObject(Album.class))
            .toList();

    AnalyticsResponse response = new AnalyticsResponse();

    response.setTotalAlbums(albums.size());

    response.setAverageRating(
            calculateAverageRating(albums)
    );

    response.setUniqueArtists(
            calculateUniqueArtists(albums)
    );

    response.setFavoriteGenre(
            calculateFavoriteGenre(albums)
    );

    response.setGenreDistribution(
            getGenreDistribution(albums)
    );

    response.setRatingDistribution(
            getRatingDistribution(albums)
    );

    response.setAlbumsPerMonth(
            getAlbumsPerMonth(albums)
    );

    response.setReleasesByYear(
            getReleaseYearDistribution(albums)
    );

    response.setTopArtists(
            getTopArtists(albums)
    );

    return response;
}
}