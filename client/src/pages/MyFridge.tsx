import { useCartFridge } from "../hooks/useCartFridge";
import RemoveButton from "../components/RemoveFromButton";

export default function MyFridge() {
  const {fridgeItems, removeFromFridge} = useCartFridge();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Fridge</h1>

      {fridgeItems.length === 0 ? (
        <p className="text-gray-600">Your fridge is empty.</p>
      ) : (
        <ul className="w-full max-w-md bg-white shadow-lg border border-gray-300 rounded-lg p-4">
          {fridgeItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-3 last:border-none"
            >
              <span className="text-lg text-gray-800">{item.name}</span>
              <RemoveButton id={item.id} onRemove={removeFromFridge} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}