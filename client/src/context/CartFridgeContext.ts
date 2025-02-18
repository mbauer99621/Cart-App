import { createContext } from "react";

interface FoodItem {
  id: number;
  name: string;
}

export interface CartFridgeContextProps {
  cartItems: FoodItem[];
  fridgeItems: FoodItem[];
  removeFromCart: (id: number) => void;
  moveToFridge: (id: number) => void;
  removeFromFridge: (id: number) => void;
  addToCart: (ingredients: string[]) => void;
  notification: string | null;
}

// Create the Context (without default value)
export const CartFridgeContext = createContext<CartFridgeContextProps | undefined>(undefined);
