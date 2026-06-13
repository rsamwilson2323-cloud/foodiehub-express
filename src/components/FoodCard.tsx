import { Heart, Plus, Star } from "lucide-react";
import type { Food } from "@/data/foodData";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export function FoodCard({ food, index = 0 }: { food: Food; index?: number }) {
  const { addToCart, toggleWish, isWished } = useApp();
  const wished = isWished(food.id);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft hover-lift hover:[--tw:1] hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${(index % 12) * 40}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://placehold.co/600x400/ff7a3d/ffffff?text=${encodeURIComponent(food.name)}`;
          }}
        />
        <button
          aria-label="Wishlist"
          onClick={() => {
            toggleWish(food.id);
            toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-secondary text-secondary" : ""}`} />
        </button>
        <span className={`absolute left-3 top-3 grid h-6 w-6 place-items-center rounded border-2 ${food.veg ? "border-emerald-600 bg-white" : "border-red-600 bg-white"}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${food.veg ? "bg-emerald-600" : "bg-red-600"}`} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold leading-tight">{food.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Star className="h-3 w-3 fill-current" /> {food.rating}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{food.category} • {food.reviews} reviews</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{food.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold">${food.price.toFixed(2)}</span>
          <button
            onClick={() => {
              addToCart(food);
              toast.success(`${food.name} added to cart`);
            }}
            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
