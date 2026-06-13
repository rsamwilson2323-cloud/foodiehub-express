import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { foods } from "@/data/foodData";
import { FoodCard } from "@/components/FoodCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — FoodieHub" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useApp();
  const items = foods.filter((f) => wishlist.includes(f.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Saved for later" title="Your Wishlist" />
      {items.length === 0 ? (
        <div className="rounded-3xl bg-card p-12 text-center shadow-soft">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 font-semibold">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any dish to save it here.</p>
          <Link to="/menu" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-105">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
        </div>
      )}
    </div>
  );
}
