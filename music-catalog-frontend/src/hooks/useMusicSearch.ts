import { useState, type FormEvent } from "react";
import { searchMusic, type SearchType } from "../services/search";
import axios from "axios";

import { addAlbumToLibrary } from "../services/library";
import type { Album } from "../data/musicCatalog";

export function useMusicSearch() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("Album");
  const [currentSearchedType, setCurrentSearchedType] = useState<SearchType>("Album");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Album[]>([]);
  const [savingAlbumId, setSavingAlbumId] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<
    "success" | "error"
  >("success");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setResults([]);
    setCurrentSearchedType(searchType);

    try {
      const data = await searchMusic(query, searchType);

      const mappedResults: Album[] = data.map((album) => ({
        id: Number(album.appleCatalogId),
        title: album.title,
        artist: album.artistName,
        genre: album.genre,
        year: new Date(album.releaseDate).getFullYear(),
        tracks: album.trackCount,
        artwork: album.artworkUrl.replace("100x100bb", "600x600bb"),
        songs: [],
      }));

      setResults(mappedResults);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMusic = async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    setQuery(trimmedQuery);
    setLoading(true);
    setHasSearched(true);
    setCurrentSearchedType(searchType);

    try {
      const data = await searchAlbums(trimmedQuery, searchType);

      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };



  const addToLibrary = async (album: Album) => {
    try {
      setSavingAlbumId(album.id.toString());

      await addAlbumToLibrary({
        appleCatalogId: album.id.toString(),
        title: album.title,
        artistName: album.artist,
        genre: album.genre,
        releaseDate: `${album.year}-01-01`,
        trackCount: album.tracks,
        artworkUrl: album.artwork,
        userRating: null,
        userNotes: null,
      });

      setSnackbarType("success");
      setSnackbarMessage("Album added to your library");
      setSnackbarOpen(true);

    } catch (error) {
      console.error(error);

      let message = "Failed to add album.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setSnackbarType("error");
      setSnackbarMessage(message);
      setSnackbarOpen(true);

    } finally {
      setSavingAlbumId(null);
    }
  };

  return {
    query,
    searchType,
    currentSearchedType,
    hasSearched,
    loading,
    results,
    savingAlbumId,
    setQuery,
    setSearchType,
    handleSubmit,
    addToLibrary,
    snackbarOpen,
    snackbarMessage,
    snackbarType,
    setSnackbarOpen
  };
}
