import { useEffect, useState, ReactNode } from "react";
import { CartFridgeContext } from "./CartFridgeContext";
import { retrieveCart, addToCart as addToCartApi } from "../api/cartAPI.js";
import auth from '../utils/auth.js'
//import { AddIngredientsToCartButton } from "../components/AddIngredientsToCartButton";

interface FoodItem {
  id: number;
  name: string;
}

/*
TODO add api calls to replace dummy data. (cartAPI/fridgeAPI)
TODO add api update calls to remove, move, and add (cartAPI/fridgeAPI)
*/
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
  
    useEffect (() => {
      const retreiveData = async () => {
        // console.log(auth.getProfile());
        const data = await retrieveCart(auth.getProfile().id);
        setCartItems(data  || cartItems);
      }
      retreiveData();
    }, [])

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

    const addToCart = async (ingredients: string[]) => {
      console.log("🛒 Adding Ingredients to Cart:", ingredients);

      if (ingredients.length === 0) {
        setNotification("⚠️ No ingredients found to add!");
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      // Convert fridge items to a set for lookups
      const fridgeSet = new Set(fridgeItems.map((item) => item.name.toLowerCase()));
      const cartSet = new Set(cartItems.map((item) => item.name.toLowerCase()));

      // Separate ingredients already in fridge or cart
      const alreadyInFridge = ingredients.filter((ingredient) =>
        fridgeSet.has(ingredient.toLowerCase())
      );

      const alreadyInCart = ingredients.filter((ingredient) =>
        cartSet.has(ingredient.toLowerCase())
      );

      // Filter out ingredients already in the fridge
      const newIngredients = ingredients.filter(
        (ingredient) => !fridgeSet.has(ingredient.toLowerCase()) && !cartSet.has(ingredient.toLowerCase())
      );

      // 🔹 **Notification for ingredients already in fridge
      if (alreadyInFridge.length > 0 && alreadyInCart.length === 0 && newIngredients.length === 0) {
        setNotification("✅ All ingredients are already in your fridge!");
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      // 🔹 **Notification for ingredients already in cart
      if (alreadyInCart.length > 0 && alreadyInFridge.length === 0 && newIngredients.length === 0) {
        setNotification("🛒 All ingredients are already in your cart!");
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      // 🔹 **Notification for a mix of both
      if (alreadyInFridge.length > 0 && alreadyInCart.length > 0 && newIngredients.length === 0) {
        setNotification("✅🛒 Some ingredients are in your fridge, and the rest are already in your cart!");
        setTimeout(() => setNotification(null), 3000);
        return; 
      }

      // 🔹 **Notification when only some items were in fridge/cart
      if (newIngredients.length < ingredients.length) {
        setNotification("⚠️Some ingredients were already in your fridge or cart and were not added.");
        setTimeout(() => setNotification(null), 3000);
      }

      const newItems = ingredients.map((name, index) => ({
        id: Date.now() + index,
        name,
      }));
      
      for (const item of newItems) {
        await addToCartApi(item.name, auth.getProfile().id);
      }

      setCartItems((prev) => {
        const updatedCart = [...prev, ...newItems];
        
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setNotification("🛒 Ingredients successfully added to My Cart!");
        setTimeout(() => setNotification(null), 3000);

        return updatedCart;
      });
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
