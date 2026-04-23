import { useEffect, useMemo, useState, type ComponentType } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Produits", href: "/admin/products", icon: Package },
  { label: "Commandes", href: "/admin/orders", icon: ShoppingBag },
];

function AdminNavLink({
  href,
  label,
  Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const active = location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-none",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const { loading, session, isAdmin, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const currentSection = useMemo(() => {
    const current =
      NAV.find((entry) => location.pathname === entry.href || location.pathname.startsWith(entry.href + "/")) ??
      null;

    if (location.pathname === "/admin") {
      return "Administration";
    }

    return current?.label ?? "Administration";
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Chargement de la session admin...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <LayoutDashboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold mb-2">Acces refuse</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Ce compte est bien connecte, mais il n'a pas les droits admin.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/" className="text-xs tracking-widest uppercase underline">
              Retour boutique
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="text-xs tracking-widest uppercase underline"
            >
              Deconnexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="font-serif text-lg font-bold tracking-[0.2em] uppercase">MAISON</p>
            <p className="text-[11px] text-muted-foreground tracking-[0.22em] uppercase mt-1">
              {currentSection}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu admin"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/45 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-[60] w-[84vw] max-w-[320px] border-r border-border bg-sidebar flex flex-col transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-6 border-b border-border flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg font-bold tracking-[0.2em] uppercase">MAISON</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                Admin
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center border border-border"
              aria-label="Fermer le menu admin"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {NAV.map(({ label, href, icon: Icon }) => (
              <AdminNavLink
                key={href}
                href={href}
                label={label}
                Icon={Icon}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start rounded-none px-0 text-xs tracking-widest uppercase"
              onClick={() => void signOut()}
            >
              <LogOut className="h-4 w-4" /> Deconnexion
            </Button>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              <Store className="h-4 w-4" /> Voir la boutique
            </Link>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="hidden lg:flex border-b border-border px-8 py-4 items-center gap-3 text-muted-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.26em]">
              {currentSection}
            </span>
          </div>
          <div className="min-h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
