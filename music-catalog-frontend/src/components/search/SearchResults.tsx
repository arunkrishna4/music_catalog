import { type Album, type SearchType } from "../../data/musicCatalog";
import { AlbumCard } from "./AlbumCard";
import { EmptyState } from "./EmptyState";
import { NoResultsState } from "./NoResultsState";
import { SkeletonCards } from "./SkeletonCards";

type SearchResultsProps = {
  hasSearched: boolean;
  loading: boolean;
  results: Album[];
  savingAlbumId: string | null;
  onAddToLibrary: (album: Album) => void;
  searchType: SearchType;
};

export function SearchResults({
  hasSearched,
  loading,
  results,
  savingAlbumId,
  onAddToLibrary,
  searchType
}: SearchResultsProps) {
  if (!hasSearched) return <EmptyState />;

  if (loading) return <SkeletonCards />;

  if (results.length === 0) return <NoResultsState searchType={searchType} />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {results.map((album) => (
        <AlbumCard key={album.id} album={album} savingAlbumId={savingAlbumId} onAddToLibrary={onAddToLibrary} searchType={searchType} />
      ))}
    </div>
  );
}
