import { Disc3, Edit3, Star, Trash2 } from "lucide-react";

import { type LibraryAlbum, type ViewMode } from "../../data/libraryCatalog";
import { Button } from "../ui/button";

type LibraryAlbumCardProps = {
  album: LibraryAlbum;
  viewMode: ViewMode;
  onDelete: (id: string) => void;
  onEdit: (album: LibraryAlbum) => void;
};

export function LibraryAlbumCard({ album, viewMode, onDelete, onEdit }: LibraryAlbumCardProps) {
  const hasRatingOrNotes = album.rating > 0 || album.notes.trim().length > 0;

  if (viewMode === "list") {
    return (
      <article className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80 md:flex-row md:items-center">
        <Artwork album={album} compact />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-black text-slate-950">
                {album.title}
              </h3>
              <p className="mt-1 truncate text-sm font-semibold text-slate-500">
                {album.artist}
              </p>
            </div>
            <GenreBadge genre={album.genre} />
          </div>

          {hasRatingOrNotes ? (
            <>
              <p
                className={`mt-3 line-clamp-2 text-sm leading-6 ${album.notes.trim()
                  ? "text-slate-500"
                  : "italic text-slate-400"
                  }`}
              >
                {album.notes.trim() || "No notes added"}
              </p>

              <RatingStars rating={album.rating} className="mt-3" />
            </>
          ) : (
            <div className="mt-3 flex min-h-[2.5rem] items-center justify-center rounded-xl bg-slate-50 px-4 py-2 text-center">
              <p className="text-sm leading-6 text-slate-400">
                No rating or notes yet — click edit to add yours.
              </p>
            </div>
          )}
        </div>

        <AlbumActions album={album} onDelete={onDelete} onEdit={onEdit} />
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      <Artwork album={album} />

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-slate-950">
              {album.title}
            </h3>
            <p className="truncate text-sm font-semibold text-slate-500">
              {album.artist}
            </p>
          </div>
          <GenreBadge genre={album.genre} />
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{album.year}</span>
          <span>{album.tracks} tracks</span>
        </div>

        {hasRatingOrNotes ? (
          <>
            <div className="h-5 flex items-center">
              <RatingStars rating={album.rating} />
            </div>

            <p
              className={`line-clamp-2 min-h-[2.5rem] text-md leading-6 ${album.notes.trim()
                ? "text-slate-500"
                : "italic text-slate-400"
                }`}
            >
              {album.notes.trim() || "No notes added"}
            </p>
          </>
        ) : (
          <div className="flex min-h-[5rem] items-center justify-center rounded-xl bg-slate-50 px-4 text-center">
            <p className="text-sm leading-6 text-slate-400">
              No rating or notes yet — click edit to add yours.
            </p>
          </div>
        )}

        <AlbumActions
          album={album}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </article>
  );
}

function Artwork({
  album,
  compact = false,
}: {
  album: LibraryAlbum;
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden ${compact ? "h-24 w-24 shrink-0 rounded-xl" : "aspect-[4/3] rounded-t-2xl"
        }`}
    >
      <img
        src={album.artwork}
        alt={album.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = "/assets/img/placeholder.png";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      <Disc3
        className={`absolute left-5 top-5 text-white transition-transform duration-500 group-hover:rotate-90 ${compact ? "h-7 w-7" : "h-8 w-8"
          }`}
      />

      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
          Saved
        </p>

        <h2
          className={`mt-1 font-black leading-tight text-white drop-shadow line-clamp-2 ${compact ? "text-sm" : "text-2xl"
            }`}
        >
          {album.title}
        </h2>
      </div>
    </div>
  );
}

function GenreBadge({ genre }: { genre: string }) {
  return (
    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
      {genre}
    </span>
  );
}

function RatingStars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  if (!rating || rating <= 0) return null;

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label={`${rating || 0} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`h-5 w-5 ${value <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-300"
            }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

type AlbumActionsProps = {
  album: LibraryAlbum;
  onDelete: (id: string) => void;
  onEdit: (album: LibraryAlbum) => void;
};

function AlbumActions({ album, onDelete, onEdit }: AlbumActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-10 flex-1 rounded-xl px-4"
        onClick={() => onEdit(album)}
      >
        <span className="flex items-center justify-center gap-2">
          <Edit3 className="h-4 w-4" aria-hidden="true" />
          Edit
        </span>
      </Button>
      <button
        type="button"
        className="flex h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
        aria-label="Delete album"
        onClick={() => onDelete(album.id)}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}