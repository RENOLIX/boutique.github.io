import type { ComponentType } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Package, ShoppingBag, Store } from "lucide-react";
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
}: {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  const location = useLocation();
  const active = location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-none",
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export default function AdminLayout() {
  const { loading, session, isAdmin, signOut } = useAuth();

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
          <h1 className="font-serif text-2xl font-bold mb-2">Accès refusé</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Ce compte est bien connecté, mais il n'a pas les droits admin.
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
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border flex flex-col bg-sidebar shrink-0">
        <div className="p-6 border-b border-border">
          <p className="font-serif text-lg font-bold tracking-[0.2em] uppercase">MAISON</p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
            Admin
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => (
            <AdminNavLink key={href} href={href} label={label} Icon={Icon} />
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start rounded-none px-0 mb-3 text-xs tracking-widest uppercase"
            onClick={() => void signOut()}
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
          >
            <Store className="h-4 w-4" /> Voir la boutique
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="min-h-screen">
          <div className="border-b border-border px-8 py-4 flex items-center gap-3 text-muted-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.26em]">
              Zone d'administration
            </span>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
