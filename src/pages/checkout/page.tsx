import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Truck } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useShop } from "@/hooks/use-shop";

const WILAYAS = [
  "Alger Centre",
  "Bab El Oued",
  "El Harrach",
  "Hussein Dey",
  "Kouba",
  "Birkhadem",
  "Hydra",
  "Ben Aknoun",
  "Chéraga",
  "Staouéli",
  "Draria",
  "Ouled Fayet",
  "Rouiba",
  "Dar El Beïda",
  "Bordj El Kiffan",
  "Ain Benian",
  "Bouzaréah",
  "El Mouradia",
];

const schema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(9, "Numéro invalide"),
  wilaya: z.string().min(1, "Veuillez choisir une wilaya"),
  address: z.string().min(5, "Adresse requise"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useShop();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, navigate]);

  if (items.length === 0) {
    return null;
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      createOrder({
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        customerPhone: data.phone,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        subtotal: totalPrice,
        shipping: 0,
        total: totalPrice,
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.wilaya,
          postalCode: "—",
          country: "Algérie",
        },
        paymentMethod: "Paiement à la livraison",
      });

      clearCart();
      navigate("/checkout/success");
    } catch {
      toast.error("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <h1 className="font-serif text-3xl font-bold mb-10">Passer la commande</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <h2 className="text-xs font-semibold tracking-widest uppercase border-b border-border pb-3">
              Informations de livraison
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Prénom</Label>
                <Input placeholder="Mohamed" {...register("firstName")} />
                {errors.firstName ? (
                  <p className="text-xs text-red-600">{errors.firstName.message}</p>
                ) : null}
              </div>
              <div className="space-y-1">
                <Label>Nom</Label>
                <Input placeholder="Benali" {...register("lastName")} />
                {errors.lastName ? (
                  <p className="text-xs text-red-600">{errors.lastName.message}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="exemple@gmail.com" type="email" {...register("email")} />
              {errors.email ? (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <Label>Numéro de téléphone</Label>
              <Input placeholder="0550 000 000" {...register("phone")} />
              {errors.phone ? (
                <p className="text-xs text-red-600">{errors.phone.message}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <Label>Wilaya (commune)</Label>
              <select
                {...register("wilaya")}
                className="w-full border border-input rounded-none px-3 py-2 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="">-- Choisir votre wilaya --</option>
                {WILAYAS.map((wilaya) => (
                  <option key={wilaya} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
              {errors.wilaya ? (
                <p className="text-xs text-red-600">{errors.wilaya.message}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <Label>Adresse complète</Label>
              <textarea
                {...register("address")}
                rows={3}
                placeholder="Cité, rue, numéro d'appartement, bâtiment..."
                className="w-full border border-input rounded-none px-3 py-2 text-sm bg-background focus:outline-none focus:border-foreground transition-colors resize-none"
              />
              {errors.address ? (
                <p className="text-xs text-red-600">{errors.address.message}</p>
              ) : null}
            </div>

            <div className="pt-2 border-t border-border space-y-3">
              <h2 className="text-xs font-semibold tracking-widest uppercase pt-2">
                Mode de paiement
              </h2>
              <div className="border-2 border-foreground p-4 bg-foreground text-background">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-semibold tracking-wide">
                    Paiement à la livraison (Cash)
                  </span>
                </div>
                <p className="text-xs text-background/70 ml-8">
                  Payez en espèces directement au livreur. Livraison dans Alger.
                </p>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Traitement...
                </>
              ) : (
                `Confirmer — ${totalPrice.toLocaleString("fr-DZ")} DZD`
              )}
            </Button>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase border-b border-border pb-3 mb-6">
              Votre commande
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-muted shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-xs text-muted-foreground">Qté : {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold shrink-0 whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString("fr-DZ")} DZD
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString("fr-DZ")} DZD</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Livraison</span>
                <span className="text-green-600 font-medium">Gratuite</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Paiement</span>
                <span>À la livraison</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>{totalPrice.toLocaleString("fr-DZ")} DZD</span>
              </div>
            </div>

            <div className="mt-6 p-4 marble-bg text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground text-[11px] tracking-widest uppercase mb-2">
                Infos livraison
              </p>
              <p>Délai estimé : 2 à 5 jours ouvrables</p>
              <p>Plusieurs communes d'Alger couvertes</p>
              <p>Suivi de commande par téléphone</p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
