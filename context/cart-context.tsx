"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { DELETE } from "@/app/utils/Axios";
import { toast } from "react-toastify";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
  inventory?: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  cart: CartItem[]; // Alias for items for backward compatibility
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  // const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    localStorage.setItem("cart", JSON.stringify(items));

    // Calculate item count and subtotal
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);

    const total = items.reduce((sum, item) => {
      const discountedPrice = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return sum + discountedPrice * item.quantity;
    }, 0);
    setSubtotal(total);
  }, [items]);

  const addItem = (newItem: CartItem) => {
    // Check if item is in stock
    if (newItem.inventory !== undefined && newItem.inventory <= 0) {
      toast.error("Sorry, this product is currently out of stock.");
      return;
    }

    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;

        // Check if requested quantity exceeds available inventory
        if (
          newItem.inventory !== undefined &&
          newQuantity > newItem.inventory
        ) {
          toast.warn(
            `Only ${newItem.inventory} items available. Adjusted quantity in cart.`
          );
          updatedItems[existingItemIndex].quantity = newItem.inventory;
        } else {
          updatedItems[existingItemIndex].quantity = newQuantity;
        }

        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = async (id: number) => {
    const lcData = localStorage.getItem("user");
    const parsedLCData = lcData && JSON.parse(lcData);
    const currentUser = parsedLCData;

    const userId = currentUser?.id;
    if (!userId) {
      toast.error("Something went wrong! Please try again.");
      return;
    }

    try {
      await DELETE(`/cart/remove/${id}/${userId}`);

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Item removed from cart successfully.");
    } catch (error: any) {
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
      toast.error("Failed to remove item from cart. Please try again.");
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prevItems;

      const item = prevItems[itemIndex];

      // Check if requested quantity exceeds available inventory
      if (item.inventory !== undefined && quantity > item.inventory) {
        toast.warn(
          `Only ${item.inventory} items available. Adjusted quantity in cart.`
        );
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = { ...item, quantity: item.inventory };
        return updatedItems;
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        cart: items, // Alias for backward compatibility
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
