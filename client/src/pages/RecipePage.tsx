import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../interfaces/RecipeCard";

const RecipePage = () => {
    const { idMeal } = useParams<{ idMeal: string }>();
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

    return (
        <section>
            {recipe ? (
                <div>
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
                        <p>{recipe.strInstructions}</p>
                    </div>
                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
        </section>
    );
};

export default RecipePage;
