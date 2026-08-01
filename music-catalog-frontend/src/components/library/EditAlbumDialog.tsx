import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Star, X } from "lucide-react";

import { type LibraryAlbum } from "../../data/libraryCatalog";
import { Button } from "../ui/button";

type EditAlbumDialogProps = {
  album: LibraryAlbum | null;
  open: boolean;
  loading?: boolean;
  onSave: (rating: number, notes: string) => void;
  onCancel: () => void;
};

export function EditAlbumDialog({
  album,
  open,
  loading = false,
  onSave,
  onCancel,
}: EditAlbumDialogProps) {
  const dialogRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");


  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onCancel]);

  useEffect(() => {
    if (!album) return;

    setRating(album.rating);
    setNotes(album.notes);
  }, [album]);

  if (!open || !album) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(rating, notes.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" >
      <form
        onSubmit={handleSubmit}
        ref={dialogRef}
        className="w-full max-w-4xl  overflow-hidden rounded-5xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              Edit Album
            </p>
            <h2 className="mt-2 text-xl font-black text-slate-950">
              {album.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {album.artist}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-60"
            aria-label="Close edit album dialog"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr]">
          <img
            src={album.artwork}
            alt={album.title}
            className="aspect-square w-full rounded-xl object-cover"
            onError={(event) => {
              event.currentTarget.src = "/assets/img/placeholder.png";
            }}
          />

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <ReadOnlyDetail label="Genre" value={album.genre} />
              <ReadOnlyDetail label="Year" value={String(album.year)} />
              <ReadOnlyDetail label="Tracks" value={String(album.tracks)} />
              <ReadOnlyDetail label="Artist" value={album.artist} />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-900">
                User review
              </label>
              <div className="mt-2 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    disabled={loading}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:border-amber-300 hover:bg-amber-50 disabled:opacity-60"
                    aria-label={`Set rating to ${value} stars`}
                  >
                    <Star
                      className={`h-5 w-5 ${value <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                        }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="album-notes"
                className="text-sm font-bold text-slate-900"
              >
                User notes
              </label>
              <textarea
                id="album-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                disabled={loading}
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm leading-6 text-[#0F172A] shadow-sm transition-all duration-200 placeholder:text-[#94A3B8] hover:border-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Add your thoughts about this album"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

function ReadOnlyDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
