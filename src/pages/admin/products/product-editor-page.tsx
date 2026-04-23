import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/hooks/use-shop";
import type { ProductCategory } from "@/types";

const MAX_IMAGES = 8;

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  comparePrice: "",
  category: "femme" as ProductCategory,
  images: [] as string[],
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

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Chargement de l'image impossible."));
    image.src = src;
  });
}

async function optimizeImageFile(file: File) {
  const originalDataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(originalDataUrl);

  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / image.width, maxDimension / image.height);
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return originalDataUrl;
  }

  context.drawImage(image, 0, 0, width, height);

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(outputType, 0.86);
}

export default function AdminProductEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, createProduct, updateProduct } = useShop();
  const product = id ? getProductById(id) : undefined;
  const isNew = !id;

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

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
      images: product.images,
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

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      return;
    }

    setUploadingImages(true);

    try {
      const convertedImages = await Promise.all(files.map((file) => optimizeImageFile(file)));

      let extraImagesIgnored = false;
      setForm((current) => {
        const remainingSlots = Math.max(0, MAX_IMAGES - current.images.length);
        const acceptedImages = convertedImages.slice(0, remainingSlots);
        extraImagesIgnored = acceptedImages.length < convertedImages.length;

        return {
          ...current,
          images: [...current.images, ...acceptedImages],
        };
      });

      if (extraImagesIgnored) {
        toast.error(`Maximum ${MAX_IMAGES} images par produit.`);
      } else {
        toast.success("Images ajoutees au produit.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Import des images impossible.");
    } finally {
      setUploadingImages(false);
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
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
      images: form.images.filter(Boolean),
      sizes: parseCsv(form.sizes),
      colors: parseCsv(form.colors),
      stock: Number(form.stock),
      featured: form.featured,
      active: form.active,
    };

    try {
      if (isNew) {
        const created = await createProduct(payload);
        toast.success("Produit cree");
        navigate(`/admin/products/${created.id}`, { replace: true });
      } else if (id) {
        await updateProduct(id, payload);
        toast.success("Produit mis a jour");
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
          Retour a la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
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
              ? "Creez un nouvel article. Sa page publique sera generee automatiquement."
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
          <Label>Prix barre (DZD)</Label>
          <Input
            name="comparePrice"
            type="number"
            value={form.comparePrice}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label>Categorie</Label>
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

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col gap-1">
            <Label>Images du produit</Label>
            <p className="text-xs text-muted-foreground">
              Ajoute des images directement depuis ton PC, ton telephone ou ta galerie.
              La premiere image sera utilisee comme image principale.
            </p>
          </div>

          <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-border px-6 py-10 text-center cursor-pointer hover:border-foreground transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingImages || form.images.length >= MAX_IMAGES}
            />
            <div className="w-12 h-12 border border-border flex items-center justify-center">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {uploadingImages ? "Import des images..." : "Choisir des images"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG ou WEBP. Maximum {MAX_IMAGES} images par produit.
              </p>
            </div>
          </label>

          {form.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {form.images.map((image, index) => (
                <div key={`${index}-${image.slice(0, 24)}`} className="space-y-2">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted border border-border">
                    <img
                      src={image}
                      alt={`Produit ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 text-foreground flex items-center justify-center border border-border hover:bg-white"
                      aria-label={`Supprimer l'image ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {index === 0 ? "Image principale" : `Image ${index + 1}`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune image ajoutee pour le moment.
            </p>
          )}
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
          <Button type="submit" size="lg" disabled={saving || uploadingImages}>
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
