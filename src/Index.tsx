import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useShop } from "@/hooks/use-shop";

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
    title: "Paiement à la livraison",
    desc: "Commandez en quelques minutes et réglez directement à la réception.",
    icon: Truck,
  },
  {
    title: "Pièces sélectionnées",
    desc: "Des coupes actuelles, des matières agréables et des prix pensés pour l'Algérie.",
    icon: Sparkles,
  },
  {
    title: "Commande en toute confiance",
    desc: "Suivi simple, confirmation rapide et service client disponible avant et après achat.",
    icon: ShieldCheck,
  },
];

export default function Index() {
  const { activeProducts } = useShop();
  const [email, setEmail] = useState("");
  const featured = activeProducts.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="relative h-[82vh] min-h-[620px] overflow-hidden">
        <img src={HERO_IMG} alt="Collection MAISON" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <p className="text-xs tracking-[0.42em] uppercase mb-4 text-white/70">
              Nouvelle collection à Alger
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-none mb-6">
              Des silhouettes sobres,
              <br />
              pensées pour durer.
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl mb-8 leading-relaxed">
              Découvrez une sélection femme, homme et accessoires avec livraison
              locale et paiement à la livraison.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-foreground text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-white/90 transition-colors"
            >
              Découvrir la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Nos univers
          </p>
          <h2 className="font-serif text-3xl font-bold">Explorez la collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-2xl font-semibold">{category.label}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mt-1">
                      Explorer
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-border">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
              Sélection du moment
            </p>
            <h2 className="font-serif text-3xl font-bold">Produits vedettes</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Voir toute la boutique
          </Link>
        </motion.div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="aspect-[3/4] w-full mb-3" />
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      <section className="marble-bg py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Newsletter
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Restez informé des nouvelles sorties
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Recevez les nouveautés, les retours en stock et les offres privées.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) {
                  toast.error("Entrez votre adresse email.");
                  return;
                }
                toast.success("Merci, vous êtes inscrit à la newsletter.");
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.com"
                className="flex-1 border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="submit"
                className="bg-foreground text-background text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-foreground text-background py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-3">
            Livraison locale
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Commandez simplement, recevez rapidement
          </h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
            Livraison dans plusieurs communes d'Alger, confirmation rapide et
            paiement à la livraison.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-white text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-foreground transition-colors"
          >
            Commander maintenant <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
