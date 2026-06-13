import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { restaurants } from "@/data/foodData";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/restaurants")({
  head: () => ({
    meta: [
      { title: "Restaurants — FoodieHub" },
      { name: "description", content: "Discover 50+ top-rated restaurants near you." },
    ],
  }),
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const [q, setQ] = useState("");
  const [openOnly, setOpenOnly] = useState(false);

  const list = useMemo(
    () =>
      restaurants
        .filter((r) => (openOnly ? r.open : true))
        .filter((r) => `${r.name} ${r.cuisine} ${r.location}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => b.rating - a.rating),
    [q, openOnly]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Discover" title="Popular Restaurants" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search restaurants, cuisines, locations…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <label className="flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm shadow-soft">
          <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="accent-[var(--primary)]" />
          Open now
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((r, i) => <RestaurantCard key={r.id} r={r} index={i} />)}
      </div>
    </div>
  );
}
