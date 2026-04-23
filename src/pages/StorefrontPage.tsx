import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";
import { useShop } from "../lib/shop-store";
import type { CustomerDetails, Order, Product } from "../types";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const benefits = [
  "Drop premium prêt à vendre",
  "Livraison offerte dès 200 EUR",
  "Back-office admin inclus",
];

const testimonials = [
  {
    quote:
      "Le rendu fait vraiment boutique premium. Le panier et le tunnel de commande sont fluides et rassurants.",
    author: "Sara, fondatrice mode",
  },
  {
    quote:
      "Le dashboard ressemble à un vrai back-office WooCommerce simplifié. On ajoute et supprime les articles en quelques secondes.",
    author: "Nassim, e-commerce manager",
  },
  {
    quote:
      "Visuellement le site vend plus cher que sa stack. C'est propre, cohérent et exploitable tout de suite.",
    author: "Lina, directrice artistique",
  },
];

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function defaultCheckoutState(): CustomerDetails {
  return {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  };
}

export function StorefrontPage() {
  const {
    products,
    categories,
    cartCount,
    orders,
    addToCart,
  } = useShop();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [sortMode, setSortMode] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  const visibleProducts = [...products]
    .filter((product) => {
      const matchesCategory =
        activeCategory === "Tout" || product.category === activeCategory;
      const searchableText = [
        product.name,
        product.category,
        product.badge,
        product.description,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        deferredSearch.length === 0 || searchableText.includes(deferredSearch);

      return matchesCategory && matchesSearch;
    })
    .sort((left, right) => {
      switch (sortMode) {
        case "price-asc":
          return left.price - right.price;
        case "price-desc":
          return right.price - left.price;
        case "newest":
          return right.id.localeCompare(left.id);
        default:
          return Number(right.featured) - Number(left.featured) || right.price - left.price;
      }
    });

  const scrollToCatalogue = () => {
    document
      .getElementById("catalogue")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-block">
            <span className="brand-mark">MV</span>
            <div>
              <p className="brand-kicker">Boutique mode premium</p>
              <h1 className="brand-name">Maison Velours</h1>
            </div>
          </div>

          <nav className="top-nav">
            <button type="button" className="ghost-link" onClick={scrollToCatalogue}>
              Collection
            </button>
            <Link className="ghost-link" to="/admin">
              Admin
            </Link>
            <button
              type="button"
              className="cart-link"
              onClick={() => setCartOpen(true)}
            >
              Panier
              <span>{cartCount}</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section surface">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Storefront premium prêt à héberger</p>
              <h2>
                Une boutique de vêtements qui présente, rassure et transforme comme
                une vraie marque haut de gamme.
              </h2>
              <p className="hero-description">
                Catalogue éditorial, panier fluide, validation de commande et
                back-office pour gérer les articles et suivre les commandes dans une
                seule application React.
              </p>

              <div className="hero-actions">
                <button type="button" className="primary-button" onClick={scrollToCatalogue}>
                  Explorer la collection
                </button>
                <Link className="secondary-button" to="/admin">
                  Ouvrir le back-office
                </Link>
              </div>

              <div className="metric-strip">
                {benefits.map((benefit) => (
                  <span key={benefit} className="metric-pill">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-panel-copy">
                <span className="panel-label">Drop vedette</span>
                <h3>{featuredProducts[0]?.name ?? "Collection signature"}</h3>
                <p>
                  Une mise en avant visuelle forte avec des produits prêts à être
                  commandés immédiatement.
                </p>
              </div>

              <div className="featured-stack">
                {featuredProducts.map((product) => (
                  <article key={product.id} className="featured-card">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <span className="micro-label">{product.category}</span>
                      <h4>{product.name}</h4>
                      <p>{formatCurrency(product.price)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="editorial-strip">
          <article className="editorial-card">
            <p className="eyebrow">Panier natif</p>
            <h3>Un tunnel simple qui reste clair sur mobile et desktop.</h3>
          </article>
          <article className="editorial-card">
            <p className="eyebrow">Catalogue dynamique</p>
            <h3>Filtres, recherche et fiches rapides pour vendre sans friction.</h3>
          </article>
          <article className="editorial-card">
            <p className="eyebrow">Admin intégré</p>
            <h3>Ajoute ou supprime des produits, puis suis les commandes.</h3>
          </article>
        </section>

        <section id="catalogue" className="surface catalogue-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Collection</p>
              <h2>Catalogue prêt à vendre</h2>
            </div>
            <p className="section-note">
              {visibleProducts.length} produit{visibleProducts.length > 1 ? "s" : ""} affiché
              {visibleProducts.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="controls-bar">
            <label className="search-field">
              <span>Recherche</span>
              <input
                type="search"
                placeholder="Blazer, robe, streetwear..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="filter-pills">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? "pill active" : "pill"}
                  onClick={() =>
                    startTransition(() => {
                      setActiveCategory(category);
                    })
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="sort-field">
              <span>Trier</span>
              <select
                value={sortMode}
                onChange={(event) =>
                  startTransition(() => {
                    setSortMode(event.target.value);
                  })
                }
              >
                <option value="featured">Mise en avant</option>
                <option value="newest">Plus récent</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </label>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  <img src={product.image} alt={product.name} />
                  <span className="product-badge">{product.badge}</span>
                </div>

                <div className="product-body">
                  <div className="product-topline">
                    <span>{product.category}</span>
                    <span>{product.stock} en stock</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="price-row">
                    <strong>{formatCurrency(product.price)}</strong>
                    {product.compareAtPrice ? (
                      <span>{formatCurrency(product.compareAtPrice)}</span>
                    ) : null}
                  </div>

                  <div className="product-meta">
                    <span>{product.sizes.join(" · ")}</span>
                    <span>{product.colors.join(" · ")}</span>
                  </div>
                </div>

                <div className="product-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Voir le produit
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      addToCart(product, product.sizes[0], product.colors[0]);
                      setCartOpen(true);
                    }}
                  >
                    Ajout rapide
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface proof-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Preuve sociale</p>
              <h2>Une interface qui respire la crédibilité</h2>
            </div>
            <p className="section-note">
              {orders.length} commande{orders.length > 1 ? "s" : ""} validée
              {orders.length > 1 ? "s" : ""} dans cette instance
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.author} className="testimonial-card">
                <p>{item.quote}</p>
                <strong>{item.author}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>

      <button
        type="button"
        className="floating-cart"
        onClick={() => setCartOpen(true)}
      >
        Panier actif
        <span>{cartCount}</span>
      </button>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onOpenCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {selectedProduct ? (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={(product, size, color) => {
            addToCart(product, size, color);
            setSelectedProduct(null);
            setCartOpen(true);
          }}
        />
      ) : null}

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

function ProductQuickView({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, size: string, color: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] ?? product.image);
  const [size, setSize] = useState(product.sizes[0] ?? "TU");
  const [color, setColor] = useState(product.colors[0] ?? "Unique");

  useEffect(() => {
    setSelectedImage(product.gallery[0] ?? product.image);
    setSize(product.sizes[0] ?? "TU");
    setColor(product.colors[0] ?? "Unique");
  }, [product]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(event) => event.stopPropagation()}>
        <div className="product-modal-media">
          <img src={selectedImage} alt={product.name} />
          <div className="gallery-strip">
            {product.gallery.map((image) => (
              <button
                key={image}
                type="button"
                className={selectedImage === image ? "thumb active" : "thumb"}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-modal-copy">
          <div className="modal-header">
            <div>
              <span className="product-badge inline">{product.badge}</span>
              <h3>{product.name}</h3>
            </div>
            <button type="button" className="close-button" onClick={onClose}>
              Fermer
            </button>
          </div>

          <p className="modal-description">{product.description}</p>

          <div className="price-row large">
            <strong>{formatCurrency(product.price)}</strong>
            {product.compareAtPrice ? (
              <span>{formatCurrency(product.compareAtPrice)}</span>
            ) : null}
          </div>

          <div className="specs-grid">
            <div>
              <span className="micro-label">Matière</span>
              <p>{product.materials}</p>
            </div>
            <div>
              <span className="micro-label">Stock</span>
              <p>{product.stock} unités prêtes</p>
            </div>
          </div>

          <div className="option-group">
            <span>Taille</span>
            <div className="option-row">
              {product.sizes.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  className={entry === size ? "option-chip active" : "option-chip"}
                  onClick={() => setSize(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <span>Couleur</span>
            <div className="option-row">
              {product.colors.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  className={entry === color ? "option-chip active" : "option-chip"}
                  onClick={() => setColor(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => onAdd(product, size, color)}
            >
              Ajouter au panier
            </button>
            <button type="button" className="secondary-button" onClick={onClose}>
              Continuer la visite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  isOpen,
  onClose,
  onOpenCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}) {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useShop();
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="drawer-header">
          <div>
            <span className="micro-label">Panier</span>
            <h3>{cartCount} article{cartCount > 1 ? "s" : ""}</h3>
          </div>
          <button type="button" className="close-button" onClick={onClose}>
            Fermer
          </button>
        </div>

        <div className="cart-list">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <p>Le panier est vide pour le moment.</p>
              <span>Ajoute quelques pièces pour simuler un vrai tunnel e-commerce.</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-copy">
                  <h4>{item.product.name}</h4>
                  <p>
                    {item.color} · {item.size}
                  </p>
                  <strong>{formatCurrency(item.lineTotal)}</strong>
                  <div className="quantity-row">
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="summary-row">
            <span>Sous-total</span>
            <strong>{formatCurrency(cartSubtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <strong>{shippingFee === 0 ? "Offerte" : formatCurrency(shippingFee)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>

          <div className="drawer-actions">
            <button
              type="button"
              className="primary-button"
              disabled={cartItems.length === 0}
              onClick={onOpenCheckout}
            >
              Passer commande
            </button>
            <button
              type="button"
              className="secondary-button"
              disabled={cartItems.length === 0}
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function CheckoutModal({
  isOpen = false,
  onClose = () => undefined,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const { cartItems, cartSubtotal, shippingFee, cartTotal, placeOrder } = useShop();
  const [formState, setFormState] = useState<CustomerDetails>(defaultCheckoutState);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormState(defaultCheckoutState());
      setSubmittedOrder(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = placeOrder(formState);

    if (order) {
      setSubmittedOrder(order);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(event) => event.stopPropagation()}>
        {submittedOrder ? (
          <div className="success-card">
            <p className="eyebrow">Commande enregistrée</p>
            <h3>{submittedOrder.id}</h3>
            <p>
              La commande a bien été ajoutée et apparaît maintenant dans le
              back-office admin avec le statut <strong>{submittedOrder.status}</strong>.
            </p>
            <div className="summary-row total">
              <span>Total</span>
              <strong>{formatCurrency(submittedOrder.total)}</strong>
            </div>
            <button type="button" className="primary-button" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div>
                <span className="micro-label">Validation</span>
                <h3>Passer la commande</h3>
              </div>
              <button type="button" className="close-button" onClick={onClose}>
                Fermer
              </button>
            </div>

            <div className="checkout-layout">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <label>
                  Nom complet
                  <input
                    required
                    value={formState.fullName}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Téléphone
                  <input
                    required
                    value={formState.phone}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Adresse
                  <input
                    required
                    value={formState.address}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Ville
                  <input
                    required
                    value={formState.city}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Notes
                  <textarea
                    rows={4}
                    value={formState.notes}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
                    }
                  />
                </label>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={cartItems.length === 0}
                >
                  Confirmer la commande
                </button>
              </form>

              <aside className="checkout-summary">
                <h4>Résumé</h4>
                <div className="checkout-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-product">
                      <img src={item.product.image} alt={item.product.name} />
                      <div>
                        <strong>{item.product.name}</strong>
                        <p>
                          {item.color} · {item.size} · x{item.quantity}
                        </p>
                      </div>
                      <span>{formatCurrency(item.lineTotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-row">
                  <span>Sous-total</span>
                  <strong>{formatCurrency(cartSubtotal)}</strong>
                </div>
                <div className="summary-row">
                  <span>Livraison</span>
                  <strong>{shippingFee === 0 ? "Offerte" : formatCurrency(shippingFee)}</strong>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <strong>{formatCurrency(cartTotal)}</strong>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
