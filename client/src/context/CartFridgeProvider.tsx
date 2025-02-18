import { useState, ReactNode } from "react";
import { CartFridgeContext } from "./CartFridgeContext";
//import { AddIngredientsToCartButton } from "../components/AddIngredientsToCartButton";

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

    const [notification, setNotification] = useState<string | null>(null);
  
    const removeFromCart = (id: number) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      localStorage.setItem("cart", JSON.stringify(cartItems.filter((item) => item.id !== id)));
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

    const addToCart = (ingredients: string[]) => {
      console.log("🛒 Adding Ingredients to Cart:", ingredients);

      if (ingredients.length === 0) {
        setNotification("⚠️ No ingredients found to add!");
        return;
      }

      const newItems = ingredients.map((name, index) => ({
        id: Date.now() + index,
        name,
      }));
  
      setCartItems((prev) => {
        const updatedCart = [...prev, ...newItems];
        setNotification("✅ Ingredients successfully added to My Cart!");

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      setTimeout(() => setNotification(null), 3000);
    };
  
    return (
      <CartFridgeContext.Provider
        value={{ cartItems, fridgeItems, removeFromCart, moveToFridge, removeFromFridge, addToCart, notification }}
      >
        {children}

        {/* Display Notification in Global UI */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {notification}
          </div>
        )}

      </CartFridgeContext.Provider>
    );
  };
