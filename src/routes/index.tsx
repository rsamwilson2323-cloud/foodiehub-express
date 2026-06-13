import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, TrendingUp, Star, ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";
import { categories, foods, restaurants, offers, testimonials } from "@/data/foodData";
import { FoodCard } from "@/components/FoodCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodieHub — Delicious Food Delivered Fresh & Fast" },
      { name: "description", content: "Discover 100+ dishes from 50+ restaurants. Pizza, burgers, biryani, sushi — delivered fresh and fast." },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const featured = [...foods].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const trending = [...foods].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-background to-rose-50 dark:from-orange-950/40 dark:via-background dark:to-rose-950/30" />
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="flex flex-col justify-center animate-fade-up">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> #1 Food Delivery App
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Delicious Food <br />
              <span className="text-gradient">Delivered Fresh & Fast</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Discover handpicked dishes from the best kitchens around you. Order in seconds, smile for hours.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); navigate({ to: "/menu", search: { q } as never }); }}
              className="mt-7 flex max-w-xl items-center gap-2 rounded-full bg-card p-2 shadow-soft"
            >
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search foods, restaurants, cuisines…"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-105">
                Search
              </button>
            </form>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
              {[
                { I: Truck, label: "Fast Delivery" },
                { I: ShieldCheck, label: "100% Safe" },
                { I: Clock, label: "Always Fresh" },
              ].map(({ I, label }) => (
                <div key={label} className="rounded-2xl glass p-3 text-center">
                  <I className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-xs font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl" />
            <img
              src={heroImg}
              alt="Delicious food spread"
              width={1600}
              height={1024}
              className="relative aspect-square w-full rounded-[2.5rem] object-cover shadow-[var(--shadow-glow)] animate-float"
            />
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl glass p-4 shadow-soft sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600"><Star className="h-5 w-5 fill-current" /></div>
                <div>
                  <p className="font-display text-lg font-bold leading-none">4.9 / 5</p>
                  <p className="text-xs text-muted-foreground">From 12k+ reviews</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 hidden rounded-2xl glass p-4 shadow-soft md:block">
              <p className="font-display text-2xl font-bold">25 min</p>
              <p className="text-xs text-muted-foreground">Avg. delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <div key={o.id} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${o.tint} p-6 text-white shadow-soft transition hover:-translate-y-1`}>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
              <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Limited Offer</p>
              <h3 className="mt-1 font-display text-3xl font-extrabold">{o.title}</h3>
              <p className="mt-1 text-sm opacity-95">{o.subtitle}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                Code: {o.code}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Browse" title="What are you craving?" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to="/menu"
              search={{ cat: c.id } as never}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] animate-fade-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 text-2xl transition-transform group-hover:scale-110">
                {c.emoji}
              </div>
              <span className="text-center text-xs font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Top Rated"
          title="Featured Dishes"
          action={<Link to="/menu" className="flex items-center gap-1 text-sm font-semibold text-primary">View all <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Hot Right Now"
          title={
            <span className="flex items-center gap-2"><TrendingUp className="h-7 w-7 text-secondary" /> Trending Foods</span> as never
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
        </div>
      </section>

      {/* POPULAR RESTAURANTS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by foodies"
          title="Popular Restaurants"
          action={<Link to="/restaurants" className="flex items-center gap-1 text-sm font-semibold text-primary">View all <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topRestaurants.map((r, i) => <RestaurantCard key={r.id} r={r} index={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Reviews" title="What our customers say" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="rounded-3xl bg-card p-6 shadow-soft animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
