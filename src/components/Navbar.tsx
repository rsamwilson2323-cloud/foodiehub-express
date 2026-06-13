import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Heart, Sun, Moon, Menu, X, UtensilsCrossed } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/wishlist", label: "Wishlist" },
];

export function Navbar() {
  const { cart, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const count = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="text-gradient">FoodieHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent transition"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link to="/wishlist" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-accent transition sm:grid" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-105" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button className="ml-1 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
