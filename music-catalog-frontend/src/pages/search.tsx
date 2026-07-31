import { AppSidebar } from "../components/layout/AppSidebar";
import { MobileHeader } from "../components/search/MobileHeader";
import { SearchForm } from "../components/search/SearchForm";
import { SearchHeader } from "../components/search/SearchHeader";
import { SearchResults } from "../components/search/SearchResults";
import { useMusicSearch } from "../hooks/useMusicSearch";
import { Snackbar } from "../components/ui/Snackbar";

export default function SearchMusic() {
  const {
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
  } = useMusicSearch();

  return (
    <div className="min-h-screen bg-slate-100">
      <AppSidebar />

      <main className="lg:pl-64">
        <div className="mx-auto min-h-screen max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <MobileHeader />

          <section className="mt-8 lg:mt-0">
            <SearchHeader />
            <SearchForm
              query={query}
              searchType={searchType}
              loading={loading}
              onQueryChange={setQuery}
              onSearchTypeChange={setSearchType}
              onSubmit={handleSubmit}
            />
          </section>
          <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
            type={snackbarType}
            onClose={() => setSnackbarOpen(false)}
          />
          <section className="mt-8">
            <SearchResults
              hasSearched={hasSearched}
              loading={loading}
              results={results}
              savingAlbumId={savingAlbumId}
              onAddToLibrary={addToLibrary}
              searchType={currentSearchedType}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
