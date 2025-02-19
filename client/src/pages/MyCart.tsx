import RemoveButton from "../components/RemoveFromButton";
import AddToFridgeButton from "../components/AddToFridgeButton";
import { useCartFridge } from "../hooks/useCartFridge";

export default function MyCart() {
  const { cartItems, moveToFridge, removeFromCart } = useCartFridge();

  return (
    <div className="container">
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Cart</h1>

    
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="w-full max-w-md bg-white shadow-lg border border-gray-300 rounded-lg p-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-3 last:border-none"
            >
              <span className="text-lg text-gray-800">{item.name}</span>
              <div className="flex items-center space-x-2"> {/* Ensure buttons are aligned */}
                <AddToFridgeButton id={item.id} onAdd={moveToFridge} />
                <RemoveButton id={item.id} onRemove={() => removeFromCart(item.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}