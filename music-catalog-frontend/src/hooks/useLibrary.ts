import { useEffect, useMemo, useState } from "react";

import { getLibraryAlbums, deleteAlbum, updateAlbum } from "../services/library";

import {
  genreFilters,
  type LibraryAlbum,
  type RatingFilter,
  type SortOption,
  type ViewMode,
} from "../data/libraryCatalog";
import { useAuth } from "../contexts/AuthContext";


function matchesRating(album: LibraryAlbum, ratingFilter: RatingFilter) {
  if (ratingFilter === "5 Stars") return album.rating === 5;
  if (ratingFilter === "4+ Stars") return album.rating >= 4;
  if (ratingFilter === "3+ Stars") return album.rating >= 3;
  return true;
}

function sortAlbums(albums: LibraryAlbum[], sortOption: SortOption) {
  return [...albums].sort((first, second) => {
    if (sortOption === "Highest Rated")
      return second.rating - first.rating;

    if (sortOption === "Album Title")
      return first.title.localeCompare(second.title);

    if (sortOption === "Artist")
      return first.artist.localeCompare(second.artist);

    return second.addedAt.localeCompare(first.addedAt);
  });
}

export function useLibrary() {
  //auth state
  const { user, loading: authLoading } = useAuth();

  //library state
  const [libraryAlbums, setLibraryAlbums] = useState<LibraryAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  //filter state
  const [query, setQuery] = useState("");
  const [genre, setGenre] =
    useState<(typeof genreFilters)[number]>("All Genres");
  const [ratingFilter, setRatingFilter] =
    useState<RatingFilter>("All Ratings");
  const [sortOption, setSortOption] =
    useState<SortOption>("Recently Added");
  const [viewMode, setViewMode] =
    useState<ViewMode>("grid");

  //edit states
  const [albumToEdit, setAlbumToEdit] =
    useState<LibraryAlbum | null>(null);

  const [editLoading, setEditLoading] =
    useState(false);

  //delete state
  const [albumToDelete, setAlbumToDelete] =
    useState<LibraryAlbum | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  //fetch library
  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    fetchLibrary();
  }, [user, authLoading]);

  async function fetchLibrary() {
    try {
      setLoading(true);

      const data = await getLibraryAlbums();

      const mappedAlbums: LibraryAlbum[] = data.map((album) => ({
        id: album.id,
        appleCatalogId: album.appleCatalogId,

        title: album.title,
        artist: album.artistName,
        genre: album.genre,

        year: album.releaseDate
          ? new Date(album.releaseDate).getFullYear()
          : 0,

        tracks: album.trackCount ?? 0,

        artwork:
          album.artworkUrl && album.artworkUrl.trim() !== ""
            ? album.artworkUrl
            : "/assets/img/placeholder.png",

        rating: album.userRating ?? 0,

        notes: album.userNotes ?? "",

        addedAt: album.createdAt
          ? new Date(album.createdAt).toISOString()
          : new Date().toISOString(),
      }));

      setLibraryAlbums(mappedAlbums);

    } catch (error) {
      console.error(error);
      setLibraryAlbums([]);
    } finally {
      setLoading(false);
    }
  }

  const confirmDelete = async () => {
    if (!albumToDelete) return;

    try {
      setDeleteLoading(true);

      await deleteAlbum(albumToDelete.id);

      setLibraryAlbums(current =>
        current.filter(album => album.id !== albumToDelete.id)
      );

      setAlbumToDelete(null);

      setSnackbar({
        open: true,
        message: `"${albumToDelete.title}" removed from your library.`,
        type: "success",
      });

    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to delete album",
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const confirmEdit = async (
    rating: number,
    notes: string
  ) => {
    if (!albumToEdit) return;

    try {
      setEditLoading(true);

      await updateAlbum(albumToEdit.id, {
        appleCatalogId: albumToEdit.appleCatalogId,
        title: albumToEdit.title,
        artistName: albumToEdit.artist,
        genre: albumToEdit.genre,
        releaseDate: `${albumToEdit.year}-01-01`,
        trackCount: albumToEdit.tracks,
        artworkUrl: albumToEdit.artwork,

        userRating: rating,
        userNotes: notes,
      });

      setLibraryAlbums(current =>
        current.map(album =>
          album.id === albumToEdit.id
            ? {
              ...album,
              rating,
              notes,
            }
            : album
        )
      );

      setAlbumToEdit(null);

      setSnackbar({
        open: true,
        message: "Album updated successfully.",
        type: "success",
      });

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to update album.",
        type: "error",
      });

    } finally {
      setEditLoading(false);
    }
  };

  const albums = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filteredAlbums = libraryAlbums.filter((album) => {
      const matchesQuery =
        !normalizedQuery ||
        album.title.toLowerCase().includes(normalizedQuery) ||
        album.artist.toLowerCase().includes(normalizedQuery) ||
        album.notes.toLowerCase().includes(normalizedQuery);

      const matchesGenre =
        genre === "All Genres" || album.genre === genre;

      return (
        matchesQuery &&
        matchesGenre &&
        matchesRating(album, ratingFilter)
      );
    });

    return sortAlbums(filteredAlbums, sortOption);
  }, [
    libraryAlbums,
    query,
    genre,
    ratingFilter,
    sortOption,
  ]);

  const summary = useMemo(() => {
    const uniqueArtists = new Set(
      libraryAlbums.map((album) => album.artist)
    );

    const ratedAlbums = libraryAlbums.filter(
      (album) => album.rating > 0
    );

    const averageRating =
      ratedAlbums.length > 0
        ? (
          ratedAlbums.reduce(
            (total, album) => total + album.rating,
            0
          ) / ratedAlbums.length
        ).toFixed(1)
        : "0.0";

    const genreCount: Record<string, number> = {};

    libraryAlbums.forEach((album) => {
      genreCount[album.genre] = (genreCount[album.genre] || 0) + 1;
    });

    const favoriteGenre =
      Object.keys(genreCount).length > 0
        ? Object.entries(genreCount).sort(
          (a, b) => b[1] - a[1]
        )[0][0]
        : "-";

    return {
      totalAlbums: libraryAlbums.length,
      favoriteGenre,
      averageRating,
      artists: uniqueArtists.size,
    };
  }, [libraryAlbums]);

  return {
    albums,
    summary,
    query,
    genre,
    ratingFilter,
    sortOption,
    viewMode,
    loading,
    setQuery,
    setGenre,
    setRatingFilter,
    setSortOption,
    setViewMode,
    albumToDelete,
    setAlbumToDelete,
    deleteLoading,
    confirmDelete,
    albumToEdit,
    setAlbumToEdit,
    editLoading,
    setEditLoading,
    confirmEdit,
    snackbar,
    setSnackbar,
    refreshLibrary: fetchLibrary,
  };
}