interface AddToFridgeButtonProps {
    id: number;
    onAdd: (id: number) => void;
  }
  
  export default function AddToFridgeButton({ id, onAdd }: AddToFridgeButtonProps) {
    return (
      <button
        onClick={() => onAdd(id)}
        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Add to Fridge
      </button>
    );
  }
  