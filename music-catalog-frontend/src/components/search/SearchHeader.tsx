export function SearchHeader() {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
          Search Music
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
          Discover albums, artists, and songs from Apple Music.
        </p>
      </div>

    </div>
  );
}
