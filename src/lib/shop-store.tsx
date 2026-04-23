import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { seedProducts } from "@/data/seed";
import type {
  CartItem,
  Order,
  OrderDraft,
  OrderStatus,
  Product,
  ProductDraft,
} from "@/types";

const PRODUCTS_KEY = "maison-products-v2";
const ORDERS_KEY = "maison-orders-v2";
const CART_KEY = "maison-cart-v2";

interface StoreContextValue {
  products: Product[];
  activeProducts: Product[];
  orders: Order[];
  items: CartItem[];
  totalPrice: number;
  cartCount: number;
  createProduct: (draft: ProductDraft) => Product;
  updateProduct: (id: string, draft: ProductDraft) => Product | null;
  removeProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  createOrder: (draft: OrderDraft) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  resetCatalog: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

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

function generateProductId(name: string) {
  return `${slugify(name)}-${Date.now().toString().slice(-4)}`;
}

function generateOrderNumber(orderCount: number) {
  return `MSN-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, "0")}`;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = usePersistentState<Product[]>(PRODUCTS_KEY, () => seedProducts);
  const [orders, setOrders] = usePersistentState<Order[]>(ORDERS_KEY, () => []);
  const [items, setItems] = usePersistentState<CartItem[]>(CART_KEY, () => []);

  useEffect(() => {
    const validIds = new Set(products.map((product) => product.id));

    setItems((currentItems) => {
      const nextItems = currentItems.filter((item) => validIds.has(item.productId));
      return nextItems.length === currentItems.length ? currentItems : nextItems;
    });
  }, [products, setItems]);

  const activeProducts = products.filter((product) => product.active);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const createProduct = (draft: ProductDraft) => {
    const product: Product = {
      ...draft,
      id: generateProductId(draft.name),
      comparePrice:
        draft.comparePrice && draft.comparePrice > draft.price
          ? draft.comparePrice
          : undefined,
    };

    setProducts((currentProducts) => [product, ...currentProducts]);
    return product;
  };

  const updateProduct = (id: string, draft: ProductDraft) => {
    const existing = products.find((product) => product.id === id);
    if (!existing) {
      return null;
    }

    const nextProduct: Product = {
      ...existing,
      ...draft,
      comparePrice:
        draft.comparePrice && draft.comparePrice > draft.price
          ? draft.comparePrice
          : undefined,
    };

    setProducts((currentProducts) =>
      currentProducts.map((product) => (product.id === id ? nextProduct : product)),
    );

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === id
          ? {
              ...item,
              productName: nextProduct.name,
              price: nextProduct.price,
              image: nextProduct.images[0] ?? "",
            }
          : item,
      ),
    );

    return nextProduct;
  };

  const removeProduct = (id: string) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const createOrder = (draft: OrderDraft) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(orders.length),
      customerName: draft.customerName,
      customerEmail: draft.customerEmail,
      customerPhone: draft.customerPhone,
      items: draft.items,
      subtotal: draft.subtotal,
      shipping: draft.shipping,
      total: draft.total,
      status: "pending",
      shippingAddress: draft.shippingAddress,
      paymentMethod: draft.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    return order;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const addItem = (nextItem: CartItem) => {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (item) =>
          item.productId === nextItem.productId &&
          item.size === nextItem.size &&
          item.color === nextItem.color,
      );

      if (existing) {
        return currentItems.map((item) =>
          item.productId === nextItem.productId &&
          item.size === nextItem.size &&
          item.color === nextItem.color
            ? { ...item, quantity: item.quantity + nextItem.quantity }
            : item,
        );
      }

      return [...currentItems, nextItem];
    });
  };

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          ),
      ),
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetCatalog = () => {
    setProducts(seedProducts);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        activeProducts,
        orders,
        items,
        totalPrice,
        cartCount,
        createProduct,
        updateProduct,
        removeProduct,
        getProductById,
        createOrder,
        updateOrderStatus,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        resetCatalog,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}
