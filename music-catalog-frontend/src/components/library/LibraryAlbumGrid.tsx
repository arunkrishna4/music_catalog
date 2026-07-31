import { type LibraryAlbum } from "../../data/libraryCatalog";
import { LibraryAlbumCard } from "./LibraryAlbumCard";
import { LibraryEmptyState } from "./LibraryEmptyState";
import { LibrarySkeleton } from "./LibrarySkeleton";

type LibraryAlbumGridProps = {
  albums: LibraryAlbum[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (album: LibraryAlbum) => void;
};

export function LibraryAlbumGrid({
  albums,
  loading,
  onDelete,
  onEdit,
}: LibraryAlbumGridProps) {
  if (loading) return <LibrarySkeleton viewMode="grid" />;

  if (albums.length === 0) return <LibraryEmptyState />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {albums.map((album) => (
        <LibraryAlbumCard key={album.id} album={album} viewMode="grid" onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
