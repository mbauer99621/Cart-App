interface AddIngredientsToCartButtonProps {
    ingredients: string[]; // Accepts an array of ingredients
    onAdd: (ingredients: string[]) => void;
  }
  
  export default function AddIngredientsToCartButton({ ingredients, onAdd }: AddIngredientsToCartButtonProps) {
    return (
      <button
        onClick={() => onAdd(ingredients)}
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add Ingredients to Cart
      </button>
    );
  }
  