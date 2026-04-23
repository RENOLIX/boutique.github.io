import { Route, Routes } from "react-router-dom";
import { ShopProvider } from "./lib/shop-store";
import { AdminPage } from "./pages/AdminPage";
import { StorefrontPage } from "./pages/StorefrontPage";

export default function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route path="/" element={<StorefrontPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </ShopProvider>
  );
}
