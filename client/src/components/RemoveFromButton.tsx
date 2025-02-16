interface RemoveButtonProps {
    id: number;
    onRemove: (id: number) => void;
  }
  
  export default function RemoveButton({ id, onRemove }: RemoveButtonProps) {
    return (
      <button
        onClick={() => onRemove(id)}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        ❌
      </button>
    );
  }