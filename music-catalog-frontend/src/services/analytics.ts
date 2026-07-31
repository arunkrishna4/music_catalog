import { api } from "./api";

export interface GenreStat {
    genre: string;
    count: number;
}

export interface RatingStat {
    rating: number;
    count: number;
}

export interface ArtistStat {
    artist: string;
    count: number;
}

export interface MonthlyStat {
    month: string;
    count: number;
}

export interface ReleaseYearStat {
    year: number;
    count: number;
}

export interface AnalyticsResponse {
    totalAlbums: number;
    averageRating: number;
    favoriteGenre: string;
    uniqueArtists: number;
    genreDistribution: GenreStat[];
    ratingDistribution: RatingStat[];
    topArtists: ArtistStat[];
    albumsPerMonth: MonthlyStat[];
    releasesByYear: ReleaseYearStat[];
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
    const response = await api.get<ApiResponse<AnalyticsResponse>>("/analytics");
    return response.data.data;
}
