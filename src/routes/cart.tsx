import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { SectionHeader } from "@/components/SectionHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — FoodieHub" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeFromCart, clearCart, applyCoupon, coupon, discount } = useApp();
  const [code, setCode] = useState(coupon);

  const subtotal = cart.reduce((a, c) => a + c.food.price * c.qty, 0);
  const delivery = subtotal > 0 ? (subtotal > 50 ? 0 : 4.99) : 0;
  const discountAmt = subtotal * discount;
  const total = Math.max(0, subtotal - discountAmt + delivery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Checkout" title="Your Cart" />

      {cart.length === 0 ? (
        <div className="rounded-3xl bg-card p-12 text-center shadow-soft">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 font-semibold">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">Add some delicious dishes to get started.</p>
          <Link to="/menu" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-105">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {cart.map(({ food, qty }) => (
              <div key={food.id} className="flex gap-4 rounded-2xl bg-card p-3 shadow-soft">
                <img src={food.image} alt={food.name} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" loading="lazy" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-semibold">{food.name}</h3>
                      <p className="text-xs text-muted-foreground">{food.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(food.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-input">
                      <button onClick={() => setQty(food.id, qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-4 w-4" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(food.id, qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-4 w-4" /></button>
                    </div>
                    <span className="font-display text-lg font-bold">${(food.price * qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-xs font-semibold text-muted-foreground hover:text-destructive">Clear cart</button>
          </div>

          <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-bold">Order Summary</h3>

            <div className="mt-4 flex items-center gap-2 rounded-full border border-input px-3 py-2">
              <Tag className="h-4 w-4 text-primary" />
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="w-full bg-transparent text-sm outline-none" />
              <button
                onClick={() => {
                  const ok = applyCoupon(code);
                  toast[ok ? "success" : "error"](ok ? "Coupon applied!" : "Invalid coupon");
                }}
                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
              >
                Apply
              </button>
            </div>
            {coupon && <p className="mt-2 text-xs text-emerald-600">Active: {coupon} ({(discount * 100).toFixed(0)}% off)</p>}
            <p className="mt-2 text-[10px] text-muted-foreground">Try: WELCOME50, FREEDEL, PIZZABOGO</p>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd>-${discountAmt.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</dd></div>
              <div className="my-2 border-t border-border" />
              <div className="flex justify-between font-display text-lg font-bold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
            </dl>
            <button
              onClick={() => { toast.success("Order placed! 🎉"); clearCart(); }}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02]"
            >
              Place Order
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
