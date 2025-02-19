import { Recipe } from "../interfaces/RecipeCard";

interface SaveRecipeButtonProps {
    recipe: Recipe; // Accepts a recipe object
  }
  
  export default function SaveRecipeButton({ recipe }: SaveRecipeButtonProps) {
    const handleSaveRecipe = async () => {
      if (!recipe) return;
  
      // Retrieve existing saved recipes from localStorage
      const savedRecipes: Recipe[] = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
  
      // Check if the recipe is already saved
      if (savedRecipes.some((saved) => saved.idMeal === recipe.idMeal)) {
        alert("⚠️ This recipe is already saved!");
        return;
      }
  
      // Add new recipe and update localStorage
      const updatedRecipes = [...savedRecipes, recipe];
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  
      console.log("✅ Recipe saved to localStorage:", updatedRecipes);
      alert("🍽️ Recipe saved successfully!");
    };
  
    return (
      <button
        onClick={handleSaveRecipe}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        👩‍🍳Save Recipe👨‍🍳
      </button>
    );
  }
  