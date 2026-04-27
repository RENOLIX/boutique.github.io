import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import BrandLogo from "@/components/shop/BrandLogo";
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
      <div className="w-full max-w-md border border-border bg-white/95 p-8 shadow-[0_18px_50px_-32px_rgba(219,97,149,0.45)]">
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto mb-5 h-14 w-[172px]" />
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-border">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="mb-2 font-serif text-3xl font-bold">Administration</h1>
          <p className="text-sm text-muted-foreground">
            Connexion admin uniquement avec email et mot de passe.
          </p>
          {!hasSupabaseConfig ? (
            <p className="mt-3 text-xs text-red-600">
              Supabase n&apos;est pas encore configure dans l&apos;application.
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
              placeholder="admin@minaboutique.dz"
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

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Pour ajouter un autre admin, cree d&apos;abord son utilisateur dans
          Supabase Auth puis ajoute son <code>user_id</code> et son email dans la
          table <code>admin_users</code>.
        </p>
      </div>
    </div>
  );
}
