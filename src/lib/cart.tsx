"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/lib/products";

export type CartLine = { slug: string; quantity: number };

type CartAction =
  | { type: "add"; slug: string; quantity?: number }
  | { type: "remove"; slug: string }
  | { type: "setQuantity"; slug: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "patpep.cart.v1";

function reducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const quantity = action.quantity ?? 1;
      const existing = state.find((l) => l.slug === action.slug);
      if (existing) {
        return state.map((l) =>
          l.slug === action.slug ? { ...l, quantity: Math.min(l.quantity + quantity, 99) } : l,
        );
      }
      return [...state, { slug: action.slug, quantity }];
    }
    case "remove":
      return state.filter((l) => l.slug !== action.slug);
    case "setQuantity":
      if (action.quantity <= 0) return state.filter((l) => l.slug !== action.slug);
      return state.map((l) =>
        l.slug === action.slug ? { ...l, quantity: Math.min(action.quantity, 99) } : l,
      );
    case "clear":
      return [];
    default:
      return state;
  }
}

export type DetailedLine = { product: Product; quantity: number; lineTotal: number };

type CartValue = {
  lines: CartLine[];
  detailed: DetailedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

const FREE_SHIPPING_THRESHOLD = 200;
const FLAT_SHIPPING = 12;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({
            type: "hydrate",
            lines: parsed.filter((l) => products.some((p) => p.slug === l.slug)),
          });
        }
      }
    } catch {
      // ignore unreadable storage
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const detailed = lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        if (!product) return null;
        return { product, quantity: line.quantity, lineTotal: product.price * line.quantity };
      })
      .filter((l): l is DetailedLine => l !== null);

    const subtotal = detailed.reduce((sum, l) => sum + l.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;

    return {
      lines,
      detailed,
      count: detailed.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add: (slug, quantity) => {
        dispatch({ type: "add", slug, quantity });
        setIsOpen(true);
      },
      remove: (slug) => dispatch({ type: "remove", slug }),
      setQuantity: (slug, quantity) => dispatch({ type: "setQuantity", slug, quantity }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };
