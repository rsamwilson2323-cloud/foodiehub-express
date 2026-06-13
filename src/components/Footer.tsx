import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-to-b from-background to-accent/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-gradient">FoodieHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Delicious Food Delivered Fresh & Fast — your cravings, our mission.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-background shadow-soft transition hover:scale-110 hover:bg-primary hover:text-primary-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
              <li><Link to="/restaurants" className="hover:text-primary">Restaurants</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>About</li><li>Careers</li><li>Partners</li><li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@foodiehub.app</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (555) 010-2025</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 21 Spice St, Foodtown</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FoodieHub. Crafted with love & garlic butter.
        </div>
      </div>
    </footer>
  );
}
