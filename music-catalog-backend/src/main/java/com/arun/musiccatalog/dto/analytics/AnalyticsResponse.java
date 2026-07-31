package com.arun.musiccatalog.dto.analytics;

import java.util.List;

public class AnalyticsResponse {

    private long totalAlbums;
    private double averageRating;
    private String favoriteGenre;
    private long uniqueArtists;

    private List<GenreStat> genreDistribution;
    private List<RatingStat> ratingDistribution;
    private List<ArtistStat> topArtists;
    private List<MonthlyStat> albumsPerMonth;
    private List<ReleaseYearStat> releasesByYear;

    public AnalyticsResponse() {}

    public long getTotalAlbums() {
        return totalAlbums;
    }

    public void setTotalAlbums(long totalAlbums) {
        this.totalAlbums = totalAlbums;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getFavoriteGenre() {
        return favoriteGenre;
    }

    public void setFavoriteGenre(String favoriteGenre) {
        this.favoriteGenre = favoriteGenre;
    }

    public long getUniqueArtists() {
        return uniqueArtists;
    }

    public void setUniqueArtists(long uniqueArtists) {
        this.uniqueArtists = uniqueArtists;
    }

    public List<GenreStat> getGenreDistribution() {
        return genreDistribution;
    }

    public void setGenreDistribution(List<GenreStat> genreDistribution) {
        this.genreDistribution = genreDistribution;
    }

    public List<RatingStat> getRatingDistribution() {
        return ratingDistribution;
    }

    public void setRatingDistribution(List<RatingStat> ratingDistribution) {
        this.ratingDistribution = ratingDistribution;
    }

    public List<ArtistStat> getTopArtists() {
        return topArtists;
    }

    public void setTopArtists(List<ArtistStat> topArtists) {
        this.topArtists = topArtists;
    }

    public List<MonthlyStat> getAlbumsPerMonth() {
        return albumsPerMonth;
    }

    public void setAlbumsPerMonth(List<MonthlyStat> albumsPerMonth) {
        this.albumsPerMonth = albumsPerMonth;
    }

    public List<ReleaseYearStat> getReleasesByYear() {
        return releasesByYear;
    }

    public void setReleasesByYear(List<ReleaseYearStat> releasesByYear) {
        this.releasesByYear = releasesByYear;
    }
}