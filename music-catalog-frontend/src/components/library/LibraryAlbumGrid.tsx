import { type LibraryAlbum, type ViewMode } from "../../data/libraryCatalog";
import { LibraryAlbumCard } from "./LibraryAlbumCard";
import { LibraryEmptyState } from "./LibraryEmptyState";
import { LibrarySkeleton } from "./LibrarySkeleton";

type LibraryAlbumGridProps = {
  albums: LibraryAlbum[];
  loading: boolean;
  viewMode: ViewMode;
  onDelete: (id: string) => void;
  onEdit: (album: LibraryAlbum) => void;
};

export function LibraryAlbumGrid({
  albums,
  loading,
  viewMode,
  onDelete,
  onEdit,
}: LibraryAlbumGridProps) {
  if (loading) return <LibrarySkeleton viewMode={viewMode} />;

  if (albums.length === 0) return <LibraryEmptyState />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {albums.map((album) => (
        <LibraryAlbumCard key={album.id} album={album} viewMode={viewMode} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
