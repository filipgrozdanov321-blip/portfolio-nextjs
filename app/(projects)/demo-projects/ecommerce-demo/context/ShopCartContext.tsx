"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  ReactNode,
} from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  variant?: string;
  quantity: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { product: Product; variant?: string; quantity: number };
    }
  | { type: "REMOVE_ITEM"; payload: { slug: string; variant?: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { slug: string; variant?: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, variant, quantity } = action.payload;
      const existingIndex = state.findIndex(
        (item) => item.product.slug === product.slug && item.variant === variant
      );

      if (existingIndex > -1) {
        return state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...state, { product, variant, quantity }];
    }

    case "REMOVE_ITEM": {
      const { slug, variant } = action.payload;
      return state.filter(
        (item) => !(item.product.slug === slug && item.variant === variant)
      );
    }

    case "UPDATE_QUANTITY": {
      const { slug, variant, quantity } = action.payload;

      if (quantity <= 0) {
        return state.filter(
          (item) => !(item.product.slug === slug && item.variant === variant)
        );
      }

      return state.map((item) =>
        item.product.slug === slug && item.variant === variant
          ? { ...item, quantity }
          : item
      );
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

interface ShopCartContextValue {
  items: CartItem[];
  addItem: (product: Product, variant?: string, quantity?: number) => void;
  removeItem: (slug: string, variant?: string) => void;
  updateQuantity: (slug: string, variant: string | undefined, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ShopCartContext = createContext<ShopCartContextValue | undefined>(undefined);

export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addItem = (product: Product, variant?: string, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, variant, quantity } });
    setIsDrawerOpen(true);
  };

  const removeItem = (slug: string, variant?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { slug, variant } });
  };

  const updateQuantity = (
    slug: string,
    variant: string | undefined,
    quantity: number
  ) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { slug, variant, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: ShopCartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };

  return (
    <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>
  );
}

export function useCart(): ShopCartContextValue {
  const context = useContext(ShopCartContext);
  if (!context) {
    throw new Error("useCart must be used within a ShopCartProvider");
  }
  return context;
}