import { Disc3, Mic2, Music2, Star } from "lucide-react";

type SummaryCardsProps = {
  summary: {
    totalAlbums: number;
    favoriteGenre: string;
    averageRating: string;
    artists: number;
  };
};

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Albums",
      value: summary.totalAlbums,
      icon: Disc3,
      detail: "Saved records",
    },
    {
      label: "Favorite Genre",
      value: summary.favoriteGenre,
      icon: Music2,
      detail: "Most collected",
    },
    {
      label: "Average Rating",
      value: summary.averageRating,
      icon: Star,
      detail: "Across library",
    },
    {
      label: "Artists",
      value: summary.artists,
      icon: Mic2,
      detail: "Unique voices",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-black text-slate-950">
                {card.value}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-400">
            {card.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
