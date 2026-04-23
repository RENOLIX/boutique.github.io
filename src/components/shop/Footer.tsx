import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import logoUrl from "@/assets/logo-maison.svg";

const LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/shop" },
  { label: "À propos", href: "/about" },
  { label: "Panier", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_0.8fr] gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logoUrl} alt="MAISON" className="h-11 w-11" />
              <div>
                <p className="font-serif text-2xl font-bold tracking-[0.14em] uppercase">
                  MAISON
                </p>
                <p className="text-xs tracking-[0.28em] uppercase text-muted-foreground">
                  Maison de mode à Alger
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Collections femme, homme et accessoires conçues pour un vestiaire
              moderne, élégant et accessible. Livraison dans les communes d'Alger
              avec paiement à la livraison.
            </p>
          </div>

          <div>
            <p className="font-serif text-xl font-semibold mb-4">Navigation</p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-serif text-xl font-semibold mb-4">Infos utiles</p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Hydra, Alger
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +213 550 12 34 56
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contact@maisonalger.dz
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4" /> Livraison 2 à 5 jours
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Paiement à la livraison
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <p>© 2026 MAISON Alger</p>
          <p>Mode élégante, livraison locale, paiement simple</p>
        </div>
      </div>
    </footer>
  );
}
