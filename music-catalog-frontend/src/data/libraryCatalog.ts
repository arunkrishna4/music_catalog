export type SortOption = "Recently Added" | "Highest Rated" | "Album Title" | "Artist";
export type ViewMode = "grid" | "list";
export type RatingFilter = "All Ratings" | "5 Stars" | "4+ Stars" | "3+ Stars";

export type LibraryAlbum = {
  id: string;
  appleCatalogId: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  tracks: number;
  rating: number;
  notes: string;
  artwork: string;
  addedAt: string;
};


export const genreFilters = [
  "All Genres",
  "Alternative",
  "Dance",
  "Indie",
  "Psychedelic",
  "Hip-Hop",
  "Folk",
  "Electronic",
  "Jazz",
] as const;
