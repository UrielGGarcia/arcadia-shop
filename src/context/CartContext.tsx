import { createContext, useState, useEffect } from "react";
import type { Product } from "../interfaces/product.interface";

export interface CartItem extends Product {
  selectedColor?: string;
  talla?: string;
  quantity?: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, color?: string, talla?: string) => void;
  increaseQuantity: (id: number, color?: string, talla?: string) => void;
  decreaseQuantity: (id: number, color?: string, talla?: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Inicializamos directamente con lo que haya en localStorage (si existe)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // ✅ Cada vez que el carrito cambie, lo guardamos
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.selectedColor === item.selectedColor &&
          p.talla === item.talla
      );
      if (existing) {
        return prev.map((p) =>
          p.id === item.id &&
          p.selectedColor === item.selectedColor &&
          p.talla === item.talla
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, color?: string, talla?: string) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === id &&
            p.selectedColor === color &&
            p.talla === talla
          )
      )
    );
  };

  const increaseQuantity = (id: number, color?: string, talla?: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id &&
        p.selectedColor === color &&
        p.talla === talla
          ? { ...p, quantity: (p.quantity || 1) + 1 }
          : p
      )
    );
  };

  const decreaseQuantity = (id: number, color?: string, talla?: string) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id &&
          p.selectedColor === color &&
          p.talla === talla
            ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) }
            : p
        )
        .filter((p) => p.quantity! > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
