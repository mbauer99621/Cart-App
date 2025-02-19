import { useState, useEffect } from "react";
import { Meal } from "../interfaces/Meals";
import { useCartFridge } from "../hooks/useCartFridge";
import AddIngredientsToCartButton from "../components/AddIngredientsToCartButton";
import RemoveButton from "../components/RemoveFromButton";
import { fetchSavedRecipes } from "../api/recipeAPI";

export default function SavedRecipes() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { addToCart, notification } = useCartFridge();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedRecipes = async () => {
      setError(null);

      try {
        const userId = 1; // Replace with dynamic user ID if available
        const savedMeals: Meal[] = await fetchSavedRecipes(userId);

        if (!savedMeals || savedMeals.length === 0) {
          throw new Error("Failed to load saved recipes.");
        }

        setMeals(savedMeals);
      } catch (err) {
        console.error("❌ Error loading saved recipes:", err);
        setError("Failed to load saved recipes. Please try again.");
      }
    };

    loadSavedRecipes();
  }, []);


  const removeMeal = (idMeal: string) => {
    // remove the meal from component state
    const updatedMeals = meals.filter((meal) => meal.idMeal !== idMeal);
    setMeals(updatedMeals);
    console.log(`❌ Removed recipe with ID: ${idMeal}`);
  };

  const extractIngredients = (meal: Meal): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
        const key = `strIngredient${i}` as keyof Meal;
        const ingredient = meal[key];

      if (ingredient) ingredients.push(ingredient);
    }
    return ingredients;
  };


  return (
    <div className="container-saved-recipe">
      <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
        <h1 className="text-white text-4xl font-bold mb-6">Saved Recipes</h1>
        <div className="flex justify-center w-full">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <ul className="space-y-4">
              {meals.map((meal) => {
                const ingredients = extractIngredients(meal);
                return (
                  <li key={meal.idMeal} className="flex items-center justify-between bg-gray-200 rounded-lg p-4 shadow">
                    <div className="flex items-center">
                      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-20 h-20 rounded-lg mr-4" />
                      <p className="text-lg font-semibold text-gray-800">{meal.strMeal}</p>
                    </div>
                    <div className="flex space-x-2">
                      <AddIngredientsToCartButton ingredients={ingredients} onAdd={addToCart} />
                      <RemoveButton id={(meal.idMeal)} onRemove={() => removeMeal(meal.idMeal)} /> {/* Add Remove Button */}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
