export type SearchType = "Album" | "Artist" | "Song";

export type Album = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: number;
  tracks: number;
  artwork: string;
  songs: string[];
};