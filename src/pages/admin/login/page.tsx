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
  const { session, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
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
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Connexion reussie");
        navigate("/admin/products", { replace: true });
        return;
      }

      const { error, needsEmailConfirmation } = await signUp(email, password);
      if (error) {
        toast.error(error);
        return;
      }

      if (needsEmailConfirmation) {
        toast.success("Compte cree. Verifie ton email pour confirmer l'acces admin.");
      } else {
        toast.success("Compte admin cree et connecte.");
        navigate("/admin/products", { replace: true });
      }
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
            Connecte-toi avec ton email et ton mot de passe admin.
          </p>
          {!hasSupabaseConfig ? (
            <p className="text-xs text-red-600 mt-3">
              Supabase n'est pas encore configure dans l'application.
            </p>
          ) : null}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={
              mode === "login"
                ? "flex-1 border border-foreground bg-foreground text-background py-2 text-xs uppercase tracking-widest"
                : "flex-1 border border-border py-2 text-xs uppercase tracking-widest"
            }
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={
              mode === "signup"
                ? "flex-1 border border-foreground bg-foreground text-background py-2 text-xs uppercase tracking-widest"
                : "flex-1 border border-border py-2 text-xs uppercase tracking-widest"
            }
          >
            Creer admin
          </button>
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
            {submitting
              ? "Patiente..."
              : mode === "login"
                ? "Se connecter"
                : "Creer le compte admin"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          Si c'est le premier acces, clique sur "Creer admin" et choisis toi-meme
          l'email et le mot de passe du compte. Le premier compte cree devient
          admin automatiquement une fois les tables Supabase en place.
        </p>
      </div>
    </div>
  );
}
