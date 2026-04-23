import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{
    error: string | null;
    needsEmailConfirmation: boolean;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const syncAdminState = async (nextUser: User | null) => {
      if (!nextUser || !supabase) {
        if (mounted) {
          setIsAdmin(false);
        }
        return;
      }

      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", nextUser.id)
        .maybeSingle();

      if (mounted) {
        setIsAdmin(Boolean(data));
      }
    };

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) {
        return;
      }

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      await syncAdminState(data.session?.user ?? null);
      if (mounted) {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      void syncAdminState(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: "Supabase n'est pas configuré." };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return {
        error: "Supabase n'est pas configuré.",
        needsEmailConfirmation: false,
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return {
      error: error?.message ?? null,
      needsEmailConfirmation: !data.session,
    };
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
