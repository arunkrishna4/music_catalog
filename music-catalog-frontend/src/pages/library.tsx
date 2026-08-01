import { useState } from "react";
import { AppSidebar } from "../components/layout/AppSidebar";
import { LibraryAlbumGrid } from "../components/library/LibraryAlbumGrid";
import { LibraryFilters } from "../components/library/LibraryFilters";
import { LibraryHeader } from "../components/library/LibraryHeader";
import { LibraryMobileHeader } from "../components/library/LibraryMobileHeader";
import { EditAlbumDialog } from "../components/library/EditAlbumDialog";
import { useLibrary } from "../hooks/useLibrary";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Snackbar } from "../components/ui/Snackbar";

export default function MyLibrary() {
  const {
    albums,
    query,
    genre,
    ratingFilter,
    sortOption,
    loading,
    setQuery,
    setGenre,
    setRatingFilter,
    setSortOption,
    deleteLoading,
    albumToDelete,
    setAlbumToDelete,
    albumToEdit,
    setAlbumToEdit,
    editLoading,
    snackbar,
    setSnackbar,
    confirmDelete,
    confirmEdit,
    refreshLibrary,
  } = useLibrary();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:pl-64">
        <div className="mx-auto min-h-screen max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <LibraryMobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

          <section className="mt-8 lg:mt-0">
            <LibraryHeader
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

            <LibraryFilters
              query={query}
              genre={genre}
              ratingFilter={ratingFilter}
              loading={loading}
              onQueryChange={setQuery}
              onGenreChange={setGenre}
              onRatingFilterChange={setRatingFilter}
              onRefresh={refreshLibrary}
            />
          </section>

          <section className="mt-8">
            <LibraryAlbumGrid
              albums={albums}
              loading={loading}
              onDelete={(id) => {
                const album = albums.find(a => a.id === id);
                if (album) setAlbumToDelete(album);
              }}
              onEdit={setAlbumToEdit}
            />
          </section>

          <ConfirmDialog
            open={albumToDelete !== null}
            title="Delete Album"
            description={`Are you sure you want to delete "${albumToDelete?.title}" by ${albumToDelete?.artist}?`}
            confirmText="Delete Album"
            cancelText="Cancel"
            loading={deleteLoading}
            onConfirm={confirmDelete}
            onCancel={() => setAlbumToDelete(null)}
          />

          <EditAlbumDialog
            open={albumToEdit !== null}
            album={albumToEdit}
            loading={editLoading}
            onSave={confirmEdit}
            onCancel={() => setAlbumToEdit(null)}
          />

          <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            type={snackbar.type}
            onClose={() =>
              setSnackbar((prev) => ({
                ...prev,
                open: false,
              }))
            }
          />
        </div>
      </main>
    </div>
  );
}
