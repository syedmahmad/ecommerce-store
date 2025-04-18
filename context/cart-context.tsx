"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  discount?: number
  inventory?: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  cart: CartItem[] // Alias for items for backward compatibility
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const { toast } = useToast()

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    localStorage.setItem("cart", JSON.stringify(items))

    // Calculate item count and subtotal
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)

    const total = items.reduce((sum, item) => {
      const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
      return sum + discountedPrice * item.quantity
    }, 0)
    setSubtotal(total)
  }, [items])

  const addItem = (newItem: CartItem) => {
    // Check if item is in stock
    if (newItem.inventory !== undefined && newItem.inventory <= 0) {
      toast({
        title: "Out of stock",
        description: "Sorry, this product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        const existingItem = updatedItems[existingItemIndex]
        const newQuantity = existingItem.quantity + newItem.quantity

        // Check if requested quantity exceeds available inventory
        if (newItem.inventory !== undefined && newQuantity > newItem.inventory) {
          toast({
            title: "Limited stock available",
            description: `Only ${newItem.inventory} items available. Adjusted quantity in cart.`,
          })
          updatedItems[existingItemIndex].quantity = newItem.inventory
        } else {
          updatedItems[existingItemIndex].quantity = newQuantity
        }

        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id)
      if (itemIndex === -1) return prevItems

      const item = prevItems[itemIndex]

      // Check if requested quantity exceeds available inventory
      if (item.inventory !== undefined && quantity > item.inventory) {
        toast({
          title: "Limited stock available",
          description: `Only ${item.inventory} items available. Adjusted quantity in cart.`,
        })

        const updatedItems = [...prevItems]
        updatedItems[itemIndex] = { ...item, quantity: item.inventory }
        return updatedItems
      }

      return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    })
  }

  const clearCart = () => {
    setItems([])
  }

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
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
