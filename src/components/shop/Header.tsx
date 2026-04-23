import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo-maison.svg";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/shop" },
  { label: "À propos", href: "/about" },
];

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoUrl} alt="MAISON" className="h-10 w-10" />
            <div className="leading-none">
              <p className="font-serif text-xl font-bold tracking-[0.18em] uppercase">
                MAISON
              </p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mt-1">
                Alger
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "text-xs uppercase tracking-[0.26em] transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/cart"
            className="inline-flex items-center gap-3 border border-border px-4 py-3 text-xs uppercase tracking-[0.24em] hover:border-foreground transition-colors shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
            <span className="font-semibold">{cartCount}</span>
          </Link>
        </div>

        <nav className="flex md:hidden items-center gap-5 pb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground overflow-x-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(isActive ? "text-foreground" : "hover:text-foreground")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
