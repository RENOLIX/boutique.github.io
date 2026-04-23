import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { useShop } from "@/hooks/use-shop";

const CATEGORIES = [
  { label: "Tout", value: "" },
  { label: "Nouveautés", value: "nouveautes" },
  { label: "Femme", value: "femme" },
  { label: "Homme", value: "homme" },
  { label: "Accessoires", value: "accessoires" },
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const { activeProducts } = useShop();
  const category = params.get("category") ?? "";

  const products = activeProducts.filter((product) => {
    if (!category) {
      return true;
    }

    if (category === "nouveautes") {
      return product.featured || product.category === "nouveautes";
    }

    return product.category === category;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-wide">
            {category
              ? CATEGORIES.find((entry) => entry.value === category)?.label ?? "Boutique"
              : "Toute la Collection"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{products.length} articles</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setParams(cat.value ? { category: cat.value } : {})}
              className={
                category === cat.value
                  ? "bg-foreground text-background border border-foreground text-xs tracking-widest uppercase px-5 py-2"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors text-xs tracking-widest uppercase px-5 py-2"
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="font-serif text-xl mb-2">Aucun article trouvé</p>
            <p className="text-sm">Revenez bientôt ou explorez une autre catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
