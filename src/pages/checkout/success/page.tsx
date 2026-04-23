import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold mb-3">Commande confirmée !</h1>
          <p className="text-muted-foreground text-sm mb-2">
            Merci pour votre achat. Votre commande a bien été enregistrée.
          </p>
          <p className="text-muted-foreground text-sm mb-10">
            Notre équipe vous contactera pour la confirmation et la livraison.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop">
              <Button size="lg">Continuer les achats</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" size="lg">
                Accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
