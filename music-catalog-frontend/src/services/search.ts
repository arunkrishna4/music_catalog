import { api } from "./api";

export type SearchType = "Album" | "Artist" | "Song";

export interface SearchResult {
    appleCatalogId: string;
    title: string;
    artistName: string;
    genre: string;
    artworkUrl: string;
    releaseDate: string;
    trackCount: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export async function searchMusic(
    query: string,
    type: SearchType
): Promise<SearchResult[]> {

    const response = await api.get<ApiResponse<SearchResult[]>>("/search", {
        params: {
            query,
            type: type.toLowerCase()
        }
    });

    return response.data.data;
}