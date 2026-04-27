import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";
import DoorIntro from "@/components/shop/DoorIntro";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useShop } from "@/hooks/use-shop";
import { claimInitialHomeIntro } from "@/lib/initial-route";

const HERO_IMG =
  "https://images.unsplash.com/photo-1775997167884-077821f7e3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1280";

const CATEGORIES = [
  {
    label: "Femme",
    img: "https://images.unsplash.com/photo-1765229276796-c93c73cc3f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
    href: "/shop?category=femme",
  },
  {
    label: "Homme",
    img: "https://images.unsplash.com/photo-1559038217-3fb2db6186f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
    href: "/shop?category=homme",
  },
  {
    label: "Accessoires",
    img: "https://images.unsplash.com/photo-1708523842501-800cd1c7505e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700",
    href: "/shop?category=accessoires",
  },
];

const COMMITMENTS = [
  {
    title: "Paiement a la livraison",
    desc: "Commandez en quelques minutes et reglez directement a la reception.",
    icon: Truck,
  },
  {
    title: "Pieces selectionnees",
    desc: "Des coupes actuelles, des matieres agreables et des prix penses pour l'Algerie.",
    icon: Sparkles,
  },
  {
    title: "Commande en toute confiance",
    desc: "Suivi simple, confirmation rapide et service client disponible avant et apres achat.",
    icon: ShieldCheck,
  },
];

export default function Index() {
  const { activeProducts } = useShop();
  const [email, setEmail] = useState("");
  const featured = activeProducts.filter((product) => product.featured).slice(0, 4);
  const [shouldPlayDoorIntro] = useState(() => claimInitialHomeIntro());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DoorIntro enabled={shouldPlayDoorIntro} />
      <Header />

      <section className="relative h-[82vh] min-h-[620px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Collection Mina Boutique"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3 text-white/80">
              <span className="font-brand text-4xl leading-none text-white">
                Mina
              </span>
              <span className="text-xs uppercase tracking-[0.42em]">
                Boutique a Alger
              </span>
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-none md:text-7xl">
              Des silhouettes sobres,
              <br />
              pensees pour durer.
            </h1>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              Decouvrez une selection femme, homme et accessoires avec livraison
              locale et paiement a la livraison.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-white/90"
            >
              Decouvrir la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Nos univers
          </p>
          <h2 className="font-serif text-3xl font-bold">Explorez la collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link to={category.href} className="group block">
                <div className="aspect-[5/6] overflow-hidden bg-muted">
                  <img
                    src={category.img}
                    alt={category.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-serif text-2xl font-semibold">
                      {category.label}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Explorer
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {COMMITMENTS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-border bg-white/70">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Selection du moment
            </p>
            <h2 className="font-serif text-3xl font-bold">Produits vedettes</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Voir toute la boutique
          </Link>
        </motion.div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-3 aspect-[3/4] w-full" />
                <Skeleton className="mb-2 h-3 w-16" />
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="marble-bg px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Newsletter
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Restez informe des nouvelles sorties
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Recevez les nouveautes, les retours en stock et les offres privees.
            </p>
            <form
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) {
                  toast.error("Entrez votre adresse email.");
                  return;
                }
                toast.success("Merci, vous etes inscrit a la newsletter.");
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.com"
                className="flex-1 border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:opacity-90"
              >
                S&apos;abonner
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-foreground px-4 py-20 text-center text-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/50">
            Livraison locale
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
            Commandez simplement, recevez rapidement
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/70">
            Livraison dans plusieurs wilayas, confirmation rapide et paiement a
            la livraison.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-foreground"
          >
            Commander maintenant <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
