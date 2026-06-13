import { Clock, MapPin, Star } from "lucide-react";
import type { Restaurant } from "@/data/foodData";

export function RestaurantCard({ r, index = 0 }: { r: Restaurant; index?: number }) {
  return (
    <div
      className="group overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] animate-fade-up"
      style={{ animationDelay: `${(index % 10) * 50}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={r.image}
          alt={r.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://placehold.co/600x400/ff7a3d/ffffff?text=${encodeURIComponent(r.name)}`;
          }}
        />
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${r.open ? "bg-emerald-600 text-white" : "bg-zinc-700 text-white"}`}>
          {r.open ? "Open" : "Closed"}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold">{r.name}</h3>
          <span className="flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Star className="h-3 w-3 fill-current" /> {r.rating}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{r.cuisine}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.deliveryTime}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.location}</span>
        </div>
      </div>
    </div>
  );
}
