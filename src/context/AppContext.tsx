import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Food } from "@/data/foodData";

type CartItem = { food: Food; qty: number };
type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (f: Food) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  coupon: string;
  applyCoupon: (c: string) => boolean;
  discount: number;
};

const AppCtx = createContext<Ctx | null>(null);

const COUPONS: Record<string, number> = {
  WELCOME50: 0.5,
  FREEDEL: 0.1,
  PIZZABOGO: 0.25,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    try {
      const c = localStorage.getItem("fh_cart");
      const w = localStorage.getItem("fh_wish");
      const t = localStorage.getItem("fh_theme") as "light" | "dark" | null;
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (t) setTheme(t);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("fh_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("fh_wish", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("fh_theme", theme);
  }, [theme]);

  const addToCart = (f: Food) =>
    setCart((c) => {
      const ex = c.find((x) => x.food.id === f.id);
      if (ex) return c.map((x) => (x.food.id === f.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { food: f, qty: 1 }];
    });
  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x.food.id !== id));
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((x) => x.food.id !== id) : c.map((x) => (x.food.id === id ? { ...x, qty } : x))));
  const clearCart = () => setCart([]);
  const toggleWish = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const isWished = (id: string) => wishlist.includes(id);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const applyCoupon = (c: string) => {
    const code = c.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon(code);
      setDiscount(COUPONS[code]);
      return true;
    }
    setCoupon("");
    setDiscount(0);
    return false;
  };

  return (
    <AppCtx.Provider
      value={{ cart, wishlist, addToCart, removeFromCart, setQty, clearCart, toggleWish, isWished, theme, toggleTheme, coupon, applyCoupon, discount }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
};
