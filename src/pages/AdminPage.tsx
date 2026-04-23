import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../lib/shop-store";
import type { OrderStatus } from "../types";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const orderStatuses: OrderStatus[] = [
  "Nouvelle",
  "En preparation",
  "Expediee",
  "Livree",
];

const initialFormState = {
  name: "",
  category: "Vestes",
  price: "129",
  compareAtPrice: "",
  stock: "10",
  badge: "Nouveau",
  image:
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  gallery: "",
  description:
    "Pièce premium pensée pour un catalogue mode avec un rendu fort et vendeur.",
  materials: "Coton premium, finitions soignées",
  sizes: "S, M, L",
  colors: "Noir, Beige",
  featured: true,
};

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function parseList(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function statusClassName(status: OrderStatus) {
  switch (status) {
    case "Livree":
      return "status-tag delivered";
    case "Expediee":
      return "status-tag shipped";
    case "En preparation":
      return "status-tag preparing";
    default:
      return "status-tag new";
  }
}

export function AdminPage() {
  const {
    products,
    orders,
    revenue,
    unitsSold,
    createProduct,
    deleteProduct,
    updateOrderStatus,
    resetCatalog,
  } = useShop();
  const [formState, setFormState] = useState(initialFormState);
  const lowStockCount = products.filter((product) => product.stock <= 8).length;

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const isCheckbox = type === "checkbox";

    setFormState((current) => ({
      ...current,
      [name]:
        isCheckbox && event.target instanceof HTMLInputElement
          ? event.target.checked
          : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createProduct({
      name: formState.name.trim(),
      category: formState.category.trim(),
      price: Number(formState.price),
      compareAtPrice: formState.compareAtPrice ? Number(formState.compareAtPrice) : null,
      stock: Number(formState.stock),
      badge: formState.badge.trim(),
      image: formState.image.trim(),
      gallery: parseList(formState.gallery),
      description: formState.description.trim(),
      materials: formState.materials.trim(),
      sizes: parseList(formState.sizes),
      colors: parseList(formState.colors),
      featured: formState.featured,
    });

    setFormState(initialFormState);
  };

  return (
    <div className="admin-shell">
      <header className="admin-topbar surface">
        <div>
          <p className="eyebrow">Back-office</p>
          <h1>Tableau de bord Maison Velours</h1>
          <p className="section-note">
            Gère le catalogue, visualise les commandes et pilote la boutique depuis
            une seule interface.
          </p>
        </div>

        <div className="admin-topbar-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => downloadJson("produits-maison-velours.json", products)}
          >
            Export produits
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => downloadJson("commandes-maison-velours.json", orders)}
          >
            Export commandes
          </button>
          <Link className="primary-button" to="/">
            Retour boutique
          </Link>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card surface">
          <span>Produits</span>
          <strong>{products.length}</strong>
          <p>Catalogue actif</p>
        </article>
        <article className="stat-card surface">
          <span>Commandes</span>
          <strong>{orders.length}</strong>
          <p>Suivi total</p>
        </article>
        <article className="stat-card surface">
          <span>Chiffre</span>
          <strong>{formatCurrency(revenue)}</strong>
          <p>Valeur cumulée</p>
        </article>
        <article className="stat-card surface">
          <span>Unités</span>
          <strong>{unitsSold}</strong>
          <p>Articles vendus</p>
        </article>
        <article className="stat-card surface">
          <span>Stock bas</span>
          <strong>{lowStockCount}</strong>
          <p>Produits à surveiller</p>
        </article>
      </section>

      <section className="dashboard-note surface">
        <p>
          Cette version fonctionne sans serveur payant : le catalogue, le panier et
          les commandes sont sauvegardés dans le navigateur courant pour rester 100 %
          gratuits sur GitHub Pages.
        </p>
        <div className="utility-buttons">
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              if (window.confirm("Réinitialiser le catalogue démo ?")) {
                resetCatalog();
              }
            }}
          >
            Réinitialiser le catalogue
          </button>
        </div>
      </section>

      <section className="admin-grid">
        <article className="surface form-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">Catalogue</p>
              <h2>Ajouter un article</h2>
            </div>
          </div>

          <form className="product-form" onSubmit={handleSubmit}>
            <label>
              Nom du produit
              <input
                required
                name="name"
                value={formState.name}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              Catégorie
              <input
                required
                name="category"
                value={formState.category}
                onChange={handleFieldChange}
              />
            </label>
            <div className="inline-fields">
              <label>
                Prix
                <input
                  type="number"
                  min="1"
                  required
                  name="price"
                  value={formState.price}
                  onChange={handleFieldChange}
                />
              </label>
              <label>
                Prix barré
                <input
                  type="number"
                  min="0"
                  name="compareAtPrice"
                  value={formState.compareAtPrice}
                  onChange={handleFieldChange}
                />
              </label>
              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  required
                  name="stock"
                  value={formState.stock}
                  onChange={handleFieldChange}
                />
              </label>
            </div>
            <label>
              Badge
              <input
                name="badge"
                value={formState.badge}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              Image principale
              <input
                required
                name="image"
                value={formState.image}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              Galerie
              <input
                name="gallery"
                value={formState.gallery}
                onChange={handleFieldChange}
                placeholder="url1, url2"
              />
            </label>
            <label>
              Description
              <textarea
                rows={4}
                name="description"
                value={formState.description}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              Matières
              <textarea
                rows={3}
                name="materials"
                value={formState.materials}
                onChange={handleFieldChange}
              />
            </label>
            <label>
              Tailles
              <input
                name="sizes"
                value={formState.sizes}
                onChange={handleFieldChange}
                placeholder="S, M, L"
              />
            </label>
            <label>
              Couleurs
              <input
                name="colors"
                value={formState.colors}
                onChange={handleFieldChange}
                placeholder="Noir, Beige"
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                name="featured"
                checked={formState.featured}
                onChange={handleFieldChange}
              />
              Mettre en avant sur la home
            </label>

            <button type="submit" className="primary-button">
              Ajouter le produit
            </button>
          </form>
        </article>

        <article className="surface list-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">Catalogue actif</p>
              <h2>Produits disponibles</h2>
            </div>
          </div>

          <div className="catalog-list">
            {products.map((product) => (
              <article key={product.id} className="catalog-item">
                <img src={product.image} alt={product.name} />
                <div className="catalog-item-copy">
                  <div className="catalog-item-head">
                    <div>
                      <h3>{product.name}</h3>
                      <p>
                        {product.category} · {formatCurrency(product.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Supprimer "${product.name}" du catalogue ?`,
                          )
                        ) {
                          deleteProduct(product.id);
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                  <p>{product.description}</p>
                  <div className="catalog-meta">
                    <span>{product.badge}</span>
                    <span>Stock: {product.stock}</span>
                    <span>{product.featured ? "Mis en avant" : "Standard"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="surface orders-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Commandes</p>
            <h2>Suivi des commandes</h2>
          </div>
        </div>

        <div className="orders-list">
          {orders.length === 0 ? (
            <div className="empty-state">
              <p>Aucune commande pour l'instant.</p>
              <span>
                Passe une commande depuis la boutique pour la voir apparaître ici.
              </span>
            </div>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-head">
                  <div>
                    <h3>{order.id}</h3>
                    <p>
                      {new Date(order.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                  <div className="order-head-actions">
                    <span className={statusClassName(order.status)}>{order.status}</span>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value as OrderStatus)
                      }
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="order-grid">
                  <div>
                    <span className="micro-label">Client</span>
                    <p>{order.customer.fullName}</p>
                    <p>{order.customer.email}</p>
                    <p>{order.customer.phone}</p>
                    <p>
                      {order.customer.address}, {order.customer.city}
                    </p>
                  </div>
                  <div>
                    <span className="micro-label">Produits</span>
                    <div className="order-lines">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-line">
                          <img src={item.image} alt={item.name} />
                          <div>
                            <strong>{item.name}</strong>
                            <p>
                              {item.color} · {item.size} · x{item.quantity}
                            </p>
                          </div>
                          <span>{formatCurrency(item.lineTotal)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <p>
                    <strong>Total:</strong> {formatCurrency(order.total)}
                  </p>
                  {order.customer.notes ? <p>Note: {order.customer.notes}</p> : null}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
