import { useContext } from "react";
import { CartFridgeContext } from "../context/CartFridgeContext";

export const useCartFridge = () => {
  const context = useContext(CartFridgeContext);
  if (!context) {
    throw new Error("useCartFridge must be used within a CartFridgeProvider");
  }
  return context;
};