import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Recipe } from "../interfaces/RecipeCard";
import SaveRecipeButton from "./SaveRecipeButton";

const RecipePage = () => {
    const { idMeal } = useParams<{ idMeal: string }>();
    const navigate = useNavigate(); // hook for navigation
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();

                if (data.meals && data.meals.length > 0) {
                    setRecipe(data.meals[0]);
                }
            } catch (err) {
                console.error("Error fetching recipe:", err);
            }
        };

        if (idMeal) {
            fetchRecipe();
        }
    }, [idMeal]);

    // Function to split instructions by sentence
    const splitInstructions = (instructions: string) => {
        return instructions.split(/(?<=[.!?])\s+/).filter(Boolean);
    };

    return (
        <section>
            {recipe ? (
                <div>
                    {/* Back to Home Page Button */}
                    <button
                        onClick={() => navigate("/")} // Navigates to home page
                        className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Home
                    </button>
                    {/* Back to Category Button */}
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="mb-4 ml-6 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Back
                    </button>

                    {/* Save Recipe Button */}
                    <div id = "saveButton">
                        <SaveRecipeButton recipe={recipe} />
                    </div>

                     

                    {/* Top Section with Title, Image, and Ingredients */}
                    <div className="recipe-container flex flex-col md:flex-row mb-6">
                        <div className="image-container flex-shrink-0 mb-6 md:mb-0">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image"/>
                        </div>
                        <div className="details-container ml-0 md:ml-6">
                            <h2 className="text-4xl font-bold mb-6">{recipe.strMeal}</h2>

                            <h3 className="text-2xl font-bold mb-2">Ingredients</h3>
                            <ul>
                                {Array.from({ length: 20 }).map((_, i) => {
                                    const ingredientKey = `strIngredient${i + 1}` as keyof Recipe;
                                    const measureKey = `strMeasure${i + 1}` as keyof Recipe;
                                    const ingredient = recipe[ingredientKey];
                                    const measure = recipe[measureKey];
                                    return ingredient ? <li key={i}>{`${measure} ${ingredient}`}</li> : null;
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions Section Below */}
                    <div className="instructions-container">
                        <h3 className="text-2xl font-bold mb-4 mt-6">Instructions</h3>
                        <ol> 
                            {splitInstructions(recipe.strInstructions).map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Print Recipe Button */}
                    <button
                        onClick={() => window.print()}
                        className="mt-6 px-4 py-2 bg-purple-500 text-white rounded"
                    >
                        Print Recipe
                    </button>

                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
        </section>
    );
};

export default RecipePage;
