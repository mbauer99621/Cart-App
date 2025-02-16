import { useState, ReactNode } from "react";
import { CartFridgeContext } from "./CartFridgeContext";

interface FoodItem {
  id: number;
  name: string;
}

export const CartFridgeProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<FoodItem[]>([
      { id: 1, name: "Tomatoes" },
      { id: 2, name: "Chicken Breast" },
      { id: 3, name: "Pasta" },
    ]);
  
    const [fridgeItems, setFridgeItems] = useState<FoodItem[]>([
      { id: 4, name: "Milk" },
      { id: 5, name: "Eggs" },
      { id: 6, name: "Butter" },
    ]);
  
    const removeFromCart = (id: number) => {
      setCartItems(cartItems.filter((item) => item.id !== id));
    };
  
    const moveToFridge = (id: number) => {
      const itemToMove = cartItems.find((item) => item.id === id);
      if (itemToMove) {
        setFridgeItems([...fridgeItems, itemToMove]);
        setCartItems(cartItems.filter((item) => item.id !== id));
      }
    };
  
    const removeFromFridge = (id: number) => {
      setFridgeItems(fridgeItems.filter((item) => item.id !== id));
    };
  
    return (
      <CartFridgeContext.Provider
        value={{ cartItems, fridgeItems, removeFromCart, moveToFridge, removeFromFridge }}
      >
        {children}
      </CartFridgeContext.Provider>
    );
  };
