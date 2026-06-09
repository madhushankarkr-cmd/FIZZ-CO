"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // flavor-packSize-subscribe
  flavor: string;
  packSize: "Individual" | "6-Pack" | "12-Pack";
  quantity: number;
  price: number;
  subscribe: boolean;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  shippingMethod: "standard" | "express";
  setShippingMethod: (method: "standard" | "express") => void;
  subtotal: number;
  shippingCost: number;
  total: number;
  totalItemsCount: number;
  pointsEarned: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state replicating checkout.html:
// - Electric Lime (6-Pack), Qty: 1, $14.99
// - Peach Pop (6-Pack), Qty: 2, $29.98 (which is $14.99 * 2)
const defaultCart: CartItem[] = [
  {
    id: "Electric Lime-6-Pack-false",
    flavor: "Electric Lime",
    packSize: "6-Pack",
    quantity: 1,
    price: 14.99,
    subscribe: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD3L2RNsxmIyfdvAPKPZzZ2PNabqeNZclUvdWclLfdWWl8dwgCD9GfEtM6TXy07b_eIy5Zb1ugeQTrbzCRgm831X6uVzsg8sZbvFHIM9iBvjEr56GF1vOPwroS2i51WEkpnvZYCGQ0Du5Kmidd9YZNxuLGaLUK2XzYYeYk8jkJ2hI0wc3i-JFL7Ei76kgpIC9OoybEEczxoAAwOTfJws7Bx2WjDOkTg49QRFokUzh3wFjOWFZ1R9pwC9jN2bQBlewHZU2-BTD2A_w",
  },
  {
    id: "Peach Pop-6-Pack-false",
    flavor: "Peach Pop",
    packSize: "6-Pack",
    quantity: 2,
    price: 14.99,
    subscribe: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbJ9FUlw7r4wLU1sL580d_xOge6jQfGcmKG7sjFvwXxviRrYQRXHVMlxo4FDhIC8O-Oyv2oTLJQQw0nLoUBPKyMpp0V7rqiMCZL-jokGUyilqhwN6BGmaQCP-ua_MWN7uSD-2meT8ytgk2HUyCBd8tl-78xNKNYyRo6HRnix4PSsWoYGVDdMP1WZUqBBIpvgdXr_NX53bJKsV5vuUQ6i1wtO6UczTr3A0wxUXEg9evf-beID8HI-RBa-VlwvEWHahHwCkQXl_1d_o",
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCart);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage on client
  useEffect(() => {
    const stored = localStorage.getItem("fizz_cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("fizz_cart", JSON.stringify(items));
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const id = `${item.flavor}-${item.packSize}-${item.subscribe}`;
    const existing = cartItems.find((i) => i.id === id);

    if (existing) {
      const updated = cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
      saveCart(updated);
    } else {
      const newItem: CartItem = { ...item, id };
      saveCart([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const updated = cartItems.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = cartItems.map((i) =>
      i.id === id ? { ...i, quantity } : i
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Free standard shipping over $40, otherwise $4.99. Express is always $12.00.
  const shippingCost =
    shippingMethod === "express" ? 12.0 : subtotal >= 40 ? 0 : 4.99;

  const total = subtotal + shippingCost;

  const totalItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // 1 point per $1 spent
  const pointsEarned = Math.round(subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shippingMethod,
        setShippingMethod,
        subtotal,
        shippingCost,
        total,
        totalItemsCount,
        pointsEarned,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
