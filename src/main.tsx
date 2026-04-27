import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

if (typeof window !== "undefined") {
  const rawHash = window.location.hash;
  const looksLikeSupabaseRecovery =
    rawHash.startsWith("#access_token=") || rawHash.includes("&access_token=");

  if (looksLikeSupabaseRecovery) {
    window.sessionStorage.setItem("__mina_supabase_recovery_hash", rawHash.slice(1));
    const params = new URLSearchParams(rawHash.slice(1));
    const nextHash =
      params.get("type") === "recovery" ? "#/admin/reset-password" : "#/";

    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
