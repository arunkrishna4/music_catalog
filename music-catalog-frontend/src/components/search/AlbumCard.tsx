import { Calendar, Disc3, Music2 } from "lucide-react";

import { type Album } from "../../data/musicCatalog";
import { Button } from "../ui/button";

export function AlbumCard({ album, savingAlbumId, onAddToLibrary }: { album: Album, savingAlbumId: string | null, onAddToLibrary: (album: Album) => void }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Album Cover */}
      <div className={`relative aspect-[4/3] overflow-hidden`}>

        <img
          src={album.artwork || "/assets/img/placeholder.png"}
          alt={album.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "/assets/img/placeholder.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <Disc3
          className="absolute left-5 top-5 h-8 w-8 text-white/90 transition-transform duration-500 group-hover:rotate-90"
        />

        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="line-clamp-2 text-2xl font-bold text-white drop-shadow">
            {album.title}
          </h2>
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-5 p-5">

        {/* Artist + Genre */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {album.title}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">
              {album.artist}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
            {album.genre}
          </span>
        </div>

        {/* Album Info */}
        <div className="flex items-center justify-between text-sm text-slate-500">

          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{album.year}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Music2 className="h-4 w-4" />
            <span>{album.tracks} Tracks</span>
          </div>

        </div>

        {/* Button */}
        <Button className="h-10 w-full rounded-xl" onClick={() => onAddToLibrary(album)} disabled={savingAlbumId === album.id.toString()}>
          {savingAlbumId === album.id.toString() ? "Adding..." : "+ Add to Library"}
        </Button>

      </div>
    </article>
  );
}
