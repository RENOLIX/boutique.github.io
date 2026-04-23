import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/hooks/use-shop";
import type { ProductCategory } from "@/types";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  comparePrice: "",
  category: "femme" as ProductCategory,
  images: "",
  sizes: "XS,S,M,L,XL",
  colors: "Noir,Blanc",
  stock: "10",
  featured: false,
  active: true,
};

const CATEGORIES: ProductCategory[] = ["nouveautes", "femme", "homme", "accessoires"];

function parseCsv(value: string) {
  return value
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default function AdminProductEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, createProduct, updateProduct } = useShop();
  const product = id ? getProductById(id) : undefined;
  const isNew = !id;

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setForm(EMPTY_FORM);
      return;
    }

    if (!product) {
      return;
    }

    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      comparePrice: product.comparePrice ? String(product.comparePrice) : "",
      category: product.category,
      images: product.images.join("\n"),
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
      stock: String(product.stock),
      featured: product.featured,
      active: product.active,
    });
  }, [isNew, product]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" && event.target instanceof HTMLInputElement
          ? event.target.checked
          : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.price.trim()) {
      toast.error("Nom et prix requis");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      category: form.category,
      images: parseCsv(form.images),
      sizes: parseCsv(form.sizes),
      colors: parseCsv(form.colors),
      stock: Number(form.stock),
      featured: form.featured,
      active: form.active,
    };

    try {
      if (isNew) {
        const created = await createProduct(payload);
        toast.success("Produit créé");
        navigate(`/admin/products/${created.id}`, { replace: true });
      } else if (id) {
        await updateProduct(id, payload);
        toast.success("Produit mis à jour");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && !product) {
    return (
      <div className="p-8">
        <h1 className="font-serif text-2xl font-bold mb-3">Produit introuvable</h1>
        <Link to="/admin/products" className="text-sm text-muted-foreground underline">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground mb-3"
          >
            <ArrowLeft className="h-4 w-4" /> Retour produits
          </Link>
          <h1 className="font-serif text-2xl font-bold">
            {isNew ? "Nouveau produit" : "Modifier le produit"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isNew
              ? "Créez un nouvel article. Sa page publique sera générée automatiquement."
              : "Modifiez les informations du produit existant."}
          </p>
        </div>

        {!isNew && product ? (
          <Link to={`/shop/product/${product.id}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg">
              <Eye className="h-4 w-4 mr-2" /> Voir la fiche produit
            </Button>
          </Link>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-1">
          <Label>Nom *</Label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Robe classique" />
        </div>

        <div className="space-y-1">
          <Label>Prix (DZD) *</Label>
          <Input name="price" type="number" value={form.price} onChange={handleChange} />
        </div>

        <div className="space-y-1">
          <Label>Prix barré (DZD)</Label>
          <Input
            name="comparePrice"
            type="number"
            value={form.comparePrice}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label>Catégorie</Label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-input rounded-none px-3 py-2 text-sm bg-background"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label>Description</Label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-input rounded-none px-3 py-2 text-sm bg-background resize-none"
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label>Images (une URL par ligne)</Label>
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={5}
            className="w-full border border-input rounded-none px-3 py-2 text-sm bg-background resize-none"
          />
        </div>

        <div className="space-y-1">
          <Label>Tailles</Label>
          <Input name="sizes" value={form.sizes} onChange={handleChange} placeholder="XS,S,M,L" />
        </div>

        <div className="space-y-1">
          <Label>Couleurs</Label>
          <Input name="colors" value={form.colors} onChange={handleChange} placeholder="Noir,Blanc" />
        </div>

        <div className="space-y-1">
          <Label>Stock</Label>
          <Input name="stock" type="number" value={form.stock} onChange={handleChange} />
        </div>

        <div className="flex items-center gap-6 pt-7">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Vedette
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Actif
          </label>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3 pt-3">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Link to="/admin/products">
            <Button type="button" variant="secondary" size="lg">
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
