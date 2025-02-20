import { useState, useEffect } from "react";
import { Meal } from "../interfaces/Meals";
import { useCartFridge } from "../hooks/useCartFridge";
import AddIngredientsToCartButton from "../components/AddIngredientsToCartButton";
import RemoveButton from "../components/RemoveFromButton";
import { fetchSavedRecipes } from "../api/recipeAPI";
import { Recipe } from "../interfaces/RecipeCard";

export default function SavedRecipes() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { addToCart, notification } = useCartFridge();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); // ✅ Correct retrieval method
    if (!userId) {
      setError("User not found. Please log in.");
      return;
    }

    const loadSavedRecipes = async () => {
      setError(null);

      try {
        // ✅ Use already retrieved `userId`
        const savedMeals: Meal[] = await fetchSavedRecipes();

        if (!savedMeals.length) {
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

  const extractIngredients = (recipe: Recipe): string[] => {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Recipe;
        const measureKey = `strMeasure${i}` as keyof Recipe;

        if (recipe[ingredientKey]) {
            const ingredient = recipe[ingredientKey] || "";
            const measure = recipe[measureKey] || "";
            ingredients.push(`${measure} ${ingredient}`.trim()); // ✅ Ensure proper formatting
        }
    }

    return ingredients;
};

  


  return (
    <div className="container-saved-recipe">
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-white text-4xl font-bold mb-6">Saved Recipes</h1>
        <div className="flex justify-center w-full">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <ul className="space-y-4">
              {meals.map((meal) => {
                if (!meal || !meal.Recipe) {
                  console.warn("⚠️ Skipping undefined meal:", meal);
                  return null; // ✅ Prevent rendering issues
                }
            
                const recipe = meal.Recipe
                ? ({
                    idMeal: meal.Recipe.idMeal || meal.recipeId || "",
                    strMeal: meal.Recipe.strMeal || "Unnamed Recipe", 
                    strMealThumb: meal.Recipe.strMealThumb || "/fallback-img.png",
                    strInstructions: meal.Recipe.strInstructions || "", 
                    strCategory: meal.Recipe.strCategory || "", 
                    strDrinkAlternate: "",
                    strArea: "",
                    strTags: "",
                    strYoutube: "",
                    strSource: "",
                    strImageSource: "",
                    strCreativeCommonsConfirmed: "",
                    dateModified: "",
                    ...Array.from({ length: 20 }, (_, i) => ({
                      [`strIngredient${i + 1}`]: meal.Recipe?.[`strIngredient${i + 1}`] || "",
                      [`strMeasure${i + 1}`]: meal.Recipe?.[`strMeasure${i + 1}`] || "",
                    })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
                  } as Recipe)
                : ({
                    idMeal: "",
                    strMeal: "Unnamed Recipe",
                    strMealThumb: "/fallback-img.png",
                    strInstructions: "",
                    strCategory: "",
                    strDrinkAlternate: "",
                    strArea: "",
                    strTags: "",
                    strYoutube: "",
                    strSource: "",
                    strImageSource: "",
                    strCreativeCommonsConfirmed: "",
                    dateModified: "",
                    ...Array.from({ length: 20 }, (_, i) => ({
                      [`strIngredient${i + 1}`]: "",
                      [`strMeasure${i + 1}`]: "",
                    })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
                  } as Recipe);
                           
                console.log("👀 Rendering Meal:", meal);
  
                const ingredients = extractIngredients(recipe); // ✅ Extract from recipe, not meal
  
                return (
                  <li key={meal.idMeal || Math.random()} className="flex items-center justify-between bg-gray-200 rounded-lg p-4 shadow">
                    <div className="flex items-center">
                      {/* ✅ Ensures valid image & name */}
                      <img
                        src={recipe.strMealThumb || "/fallback-img.png"}
                        alt={recipe.strMeal || "Unnamed Recipe"}
                        className="w-20 h-20 rounded-lg mr-4"
                      />
                      <p className="text-lg font-semibold text-gray-800">{recipe.strMeal || "Unnamed Recipe"}</p>
                    </div>
                    <div className="flex space-x-2">
                      <AddIngredientsToCartButton ingredients={ingredients} onAdd={addToCart} />
                      <RemoveButton id={meal.idMeal} onRemove={() => removeMeal(meal.idMeal)} />
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
