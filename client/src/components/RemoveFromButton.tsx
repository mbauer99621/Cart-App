import orangeX from "../assets/orangeX.png"; 

interface RemoveButtonProps {
    id: string | number;
    onRemove: (id: string | number) => void;
  }
  
  export default function RemoveButton({ id, onRemove }: RemoveButtonProps) {
    return (
      <button
        onClick={() => onRemove(id)}
        className="px-3 py-1 rounded-md transition"
        >
            <img src={orangeX} alt="Remove" className="w-5 h-5" />
      </button>
    );
  }