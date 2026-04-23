import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "@/components/providers/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin/products" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Connexion reussie");
      navigate("/admin/products", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border bg-white p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto mb-4">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Administration</h1>
          <p className="text-sm text-muted-foreground">
            Connexion admin uniquement avec email et mot de passe.
          </p>
          {!hasSupabaseConfig ? (
            <p className="text-xs text-red-600 mt-3">
              Supabase n'est pas encore configure dans l'application.
            </p>
          ) : null}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@maisonalger.dz"
            />
          </div>

          <div className="space-y-1">
            <Label>Mot de passe</Label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              placeholder="********"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Patiente..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          Pour ajouter un autre admin, cree d'abord son utilisateur dans Supabase
          Auth puis ajoute son `user_id` et son email dans la table `admin_users`.
        </p>
      </div>
    </div>
  );
}
