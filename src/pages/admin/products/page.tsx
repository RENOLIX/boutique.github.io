import { Link } from "react-router-dom";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/hooks/use-shop";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const { products, removeProduct } = useShop();

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) {
      return;
    }

    removeProduct(id);
    toast.success("Produit supprimé");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">Produits</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} article(s)</p>
        </div>
        <Link to="/admin/products/new">
          <Button size="lg">
            <Plus className="h-4 w-4 mr-2" /> Ajouter
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border">
          <p className="font-serif text-xl mb-2">Aucun produit</p>
          <p className="text-sm text-muted-foreground mb-6">
            Commencez par ajouter votre premier article.
          </p>
          <Link to="/admin/products/new">
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" /> Créer un produit
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Produit
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase hidden md:table-cell">
                  Catégorie
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Prix
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase hidden md:table-cell">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase hidden md:table-cell">
                  Statut
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-12 object-cover bg-muted shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-12 bg-muted shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        {product.featured ? (
                          <span className="text-[10px] text-amber-600 font-medium">
                            ★ Vedette
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs tracking-wide uppercase">{product.category}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {product.price.toLocaleString("fr-DZ")} DZD
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {product.stock}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={
                        product.active
                          ? "text-[10px] font-bold tracking-widest uppercase text-green-600"
                          : "text-[10px] font-bold tracking-widest uppercase text-muted-foreground"
                      }
                    >
                      {product.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/shop/product/${product.id}`}
                        className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted"
                        title="Voir"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted"
                        title="Modifier"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        className="h-8 w-8 inline-flex items-center justify-center text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
