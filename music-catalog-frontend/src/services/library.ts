import { api } from "./api";

export interface CreateAlbumRequest {
    appleCatalogId: string;
    title: string;
    artistName: string;
    genre: string;
    releaseDate: string;
    trackCount: number;
    artworkUrl: string;
    userRating: number | null;
    userNotes: string | null;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface LibraryAlbum {
    id: string;
    appleCatalogId: string;
    title: string;
    artistName: string;
    genre: string;
    releaseDate: string;
    trackCount: number;
    artworkUrl: string;
    userRating: number | null;
    userNotes: string | null;

    createdAt: string;
    updatedAt: string;
}

export interface UpdateAlbumRequest {
    appleCatalogId: string;
    title: string;
    artistName: string;
    genre: string;
    releaseDate: string;
    trackCount: number;
    artworkUrl: string;

    userRating: number | null;
    userNotes: string | null;
}

export async function addAlbumToLibrary(
    album: CreateAlbumRequest
) {
    const response = await api.post<ApiResponse<any>>(
        "/library",
        album
    );

    return response.data.data;
}

export async function getLibraryAlbums(): Promise<LibraryAlbum[]> {

    const response = await api.get<ApiResponse<LibraryAlbum[]>>("/library");

    return response.data.data;

}


export async function deleteAlbum(id: string) {
    const response = await api.delete(`/library/${id}`);
    return response.data;
}

export async function updateAlbum(
    id: string,
    payload: UpdateAlbumRequest
) {
    const response = await api.put(
        `/library/${id}`,
        payload
    );

    return response.data.data;
}