import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { seedProducts } from "../data/seed";
import type {
  CartItem,
  CartViewItem,
  CustomerDetails,
  Order,
  OrderStatus,
  Product,
  ProductDraft,
} from "../types";

const PRODUCTS_KEY = "maison-velours-products-v1";
const ORDERS_KEY = "maison-velours-orders-v1";
const CART_KEY = "maison-velours-cart-v1";

interface ShopContextValue {
  products: Product[];
  categories: string[];
  orders: Order[];
  cartItems: CartViewItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;
  unitsSold: number;
  revenue: number;
  addToCart: (product: Product, size: string, color: string) => void;
  updateCartItemQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
  placeOrder: (customer: CustomerDetails) => Order | null;
  createProduct: (draft: ProductDraft) => Product;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetCatalog: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage<T>(key: string, fallback: () => T): T {
  if (typeof window === "undefined") {
    return fallback();
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback();
  } catch {
    return fallback();
  }
}

function usePersistentState<T>(key: string, fallback: () => T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ShopProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = usePersistentState<Product[]>(
    PRODUCTS_KEY,
    () => seedProducts,
  );
  const [orders, setOrders] = usePersistentState<Order[]>(ORDERS_KEY, () => []);
  const [cart, setCart] = usePersistentState<CartItem[]>(CART_KEY, () => []);

  useEffect(() => {
    const activeIds = new Set(products.map((product) => product.id));

    setCart((currentCart) => {
      const nextCart = currentCart.filter((item) => activeIds.has(item.productId));
      return nextCart.length === currentCart.length ? currentCart : nextCart;
    });
  }, [products, setCart]);

  const cartItems = cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      return [];
    }

    return [
      {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      },
    ];
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + item.lineTotal, 0);
  const shippingFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 200 ? 0 : 19;
  const cartTotal = cartSubtotal + shippingFee;
  const categories = ["Tout", ...new Set(products.map((product) => product.category))];
  const unitsSold = orders.reduce(
    (total, order) =>
      total + order.items.reduce((itemsTotal, item) => itemsTotal + item.quantity, 0),
    0,
  );
  const revenue = orders.reduce((total, order) => total + order.total, 0);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((currentCart) => {
      const existingLine = currentCart.find(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color === color,
      );

      if (existingLine) {
        return currentCart.map((item) =>
          item.id === existingLine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: createId("line"),
          productId: product.id,
          quantity: 1,
          size,
          color,
        },
      ];
    });
  };

  const updateCartItemQuantity = (lineId: string, quantity: number) => {
    setCart((currentCart) => {
      if (quantity <= 0) {
        return currentCart.filter((item) => item.id !== lineId);
      }

      return currentCart.map((item) =>
        item.id === lineId ? { ...item, quantity } : item,
      );
    });
  };

  const removeFromCart = (lineId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== lineId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (customer: CustomerDetails) => {
    if (cartItems.length === 0) {
      return null;
    }

    const newOrder: Order = {
      id: `CMD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        lineTotal: item.lineTotal,
      })),
      subtotal: cartSubtotal,
      shipping: shippingFee,
      total: cartTotal,
      status: "Nouvelle",
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    setCart([]);
    return newOrder;
  };

  const createProduct = (draft: ProductDraft) => {
    const product: Product = {
      ...draft,
      id: `${slugify(draft.name)}-${Date.now().toString().slice(-5)}`,
      compareAtPrice:
        draft.compareAtPrice && draft.compareAtPrice > draft.price
          ? draft.compareAtPrice
          : null,
      gallery:
        draft.gallery.length > 0
          ? draft.gallery
          : [draft.image],
    };

    setProducts((currentProducts) => [product, ...currentProducts]);
    return product;
  };

  const deleteProduct = (productId: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const resetCatalog = () => {
    setProducts(seedProducts);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        orders,
        cartItems,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        unitsSold,
        revenue,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        createProduct,
        deleteProduct,
        updateOrderStatus,
        resetCatalog,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}
