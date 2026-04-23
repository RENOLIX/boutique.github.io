import type { Product } from "../types";

export const seedProducts: Product[] = [
  {
    id: "atelier-tailored-blazer",
    name: "Blazer Atelier Tailored",
    price: 169,
    compareAtPrice: 219,
    category: "Vestes",
    badge: "Best-seller",
    description:
      "Une coupe structurée, des épaules douces et un tombé premium pour une silhouette éditoriale du matin au soir.",
    materials: "Laine légère, viscose premium et doublure satinée",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir carbone", "Sable"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    stock: 14,
  },
  {
    id: "robe-nova-satin",
    name: "Robe Nova Satin",
    price: 129,
    compareAtPrice: 169,
    category: "Robes",
    badge: "Edition soir",
    description:
      "Une robe fluide pensée pour les dîners, shootings et cérémonies avec une brillance sobre et une ligne impeccable.",
    materials: "Satin recyclé, doublure stretch et finition main",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Bordeaux", "Champagne"],
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    stock: 11,
  },
  {
    id: "manteau-studio-wool",
    name: "Manteau Studio Wool",
    price: 239,
    compareAtPrice: 289,
    category: "Outerwear",
    badge: "Capsule hiver",
    description:
      "Un manteau long au minimalisme fort, pensé pour signer le look en une seule pièce.",
    materials: "Laine mélangée, cachemire doux et finition brossée",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Anthracite"],
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    stock: 7,
  },
  {
    id: "ensemble-cargo-signature",
    name: "Ensemble Cargo Signature",
    price: 149,
    compareAtPrice: null,
    category: "Streetwear",
    badge: "Nouveau drop",
    description:
      "Un ensemble taillé pour le quotidien premium avec une attitude nette, contemporaine et très facile à styliser.",
    materials: "Coton lourd, twill stretch et finitions utilitaires",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Noir"],
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    stock: 18,
  },
  {
    id: "pull-halo-knit",
    name: "Pull Halo Knit",
    price: 89,
    compareAtPrice: 119,
    category: "Maille",
    badge: "Soft touch",
    description:
      "Une maille généreuse, élégante et douce pour apporter du relief à la garde-robe sans perdre en confort.",
    materials: "Maille côtelée, alpaga doux et nylon recyclé",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivoire", "Taupe"],
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    stock: 22,
  },
  {
    id: "chemise-riviera",
    name: "Chemise Riviera",
    price: 79,
    compareAtPrice: 99,
    category: "Chemises",
    badge: "Essential",
    description:
      "Une chemise facile à vendre : propre, premium et construite pour les silhouettes casual chic.",
    materials: "Popeline de coton, toucher lavé et tenue naturelle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc optique", "Bleu glacier"],
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    stock: 30,
  },
  {
    id: "jupe-eclipse",
    name: "Jupe Eclipse",
    price: 95,
    compareAtPrice: null,
    category: "Robes",
    badge: "Studio pick",
    description:
      "Une pièce ligne A avec beaucoup d'allure et une vraie facilité de mix avec maille, blazer ou tee premium.",
    materials: "Crêpe fluide, ceinture structurée et zip invisible",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir minuit", "Rouille"],
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    stock: 12,
  },
  {
    id: "hoodie-atelier-club",
    name: "Hoodie Atelier Club",
    price: 99,
    compareAtPrice: 125,
    category: "Streetwear",
    badge: "Drop limité",
    description:
      "Le hoodie signature pour donner à la boutique une pièce forte, rentable et très désirable en acquisition.",
    materials: "Molleton épais 420 gsm, coton premium et broderie ton sur ton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir profond", "Crème"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    stock: 20,
  },
];
