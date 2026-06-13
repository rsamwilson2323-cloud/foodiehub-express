import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, foods } from "@/data/foodData";
import { FoodCard } from "@/components/FoodCard";
import { SectionHeader } from "@/components/SectionHeader";

type Search = { q?: string; cat?: string };

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Menu — FoodieHub" },
      { name: "description", content: "Browse 200+ dishes across pizza, burgers, biryani, desserts, juices, momos and more." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { q: q0, cat: cat0 } = Route.useSearch();
  const [q, setQ] = useState(q0 ?? "");
  const [cat, setCat] = useState<string>(cat0 ?? "all");
  const [diet, setDiet] = useState<"all" | "veg" | "nonveg">("all");
  const [maxPrice, setMaxPrice] = useState(700);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"popular" | "rating" | "lowhigh" | "highlow">("popular");
  const [visible, setVisible] = useState(16);

  useEffect(() => { setVisible(16); }, [q, cat, diet, maxPrice, minRating, sort]);

  const filtered = useMemo(() => {
    let list = foods.filter((f) => {
      if (q && !`${f.name} ${f.category} ${f.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "all" && categories.find((c) => c.id === cat)?.name !== f.category) return false;
      if (diet === "veg" && !f.veg) return false;
      if (diet === "nonveg" && f.veg) return false;
      if (f.price > maxPrice) return false;
      if (f.rating < minRating) return false;
      return true;
    });
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    else if (sort === "lowhigh") list = list.sort((a, b) => a.price - b.price);
    else if (sort === "highlow") list = list.sort((a, b) => b.price - a.price);
    else list = list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [q, cat, diet, maxPrice, minRating, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Explore" title="Full Menu" />

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="sticky top-24 rounded-2xl bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</label>
            <div className="mt-1 flex items-center gap-2 rounded-full border border-input px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a dish" className="w-full bg-transparent text-sm outline-none" />
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="mt-1 w-full rounded-full border border-input bg-background px-3 py-2 text-sm">
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diet</label>
            <div className="mt-1 grid grid-cols-3 gap-1 rounded-full bg-muted p-1 text-xs font-semibold">
              {(["all","veg","nonveg"] as const).map((d) => (
                <button key={d} onClick={() => setDiet(d)} className={`rounded-full px-2 py-1.5 transition ${diet === d ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
                  {d === "all" ? "All" : d === "veg" ? "Veg" : "Non-Veg"}
                </button>
              ))}
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max Price: ${maxPrice}</label>
            <input type="range" min={50} max={700} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Rating: {minRating.toFixed(1)}★</label>
            <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="mt-1 w-full rounded-full border border-input bg-background px-3 py-2 text-sm">
              <option value="popular">Popularity</option>
              <option value="rating">Rating</option>
              <option value="lowhigh">Price: Low to High</option>
              <option value="highlow">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} dishes found</p>
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-card p-10 text-center shadow-soft">
              <p className="font-semibold">No dishes match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening the price range or clearing the category.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, visible).map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
              </div>
              {visible < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <button onClick={() => setVisible((v) => v + 16)} className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-105">
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
