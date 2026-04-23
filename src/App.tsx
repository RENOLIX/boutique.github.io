import { Toaster } from "sonner";
import { Navigate, Route, Routes } from "react-router-dom";
import { StoreProvider } from "@/lib/shop-store";
import AdminLayout from "@/pages/admin/layout";
import AboutPage from "@/pages/about/page";
import AuthCallback from "@/pages/auth/Callback";
import CartPage from "@/pages/cart/page";
import CheckoutPage from "@/pages/checkout/page";
import OrderSuccessPage from "@/pages/checkout/success/page";
import AdminOrdersPage from "@/pages/admin/orders/page";
import AdminProductsPage from "@/pages/admin/products/page";
import AdminProductEditorPage from "@/pages/admin/products/product-editor-page";
import Index from "@/Index";
import NotFound from "@/NotFound";
import ProductPage from "@/pages/shop/product/page";
import ShopPage from "@/pages/shop/page";

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<OrderSuccessPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminProductEditorPage />} />
          <Route path="products/:id" element={<AdminProductEditorPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </StoreProvider>
  );
}
