import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const CategoryRecipes = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchRecipes();
    }, [categoryName]);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
            const data = await response.json();
            if (data.meals) {
                setRecipes(data.meals);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    return (
        <section className="text-center p-6">
            <h2 className="text-3xl font-bold mb-6">{categoryName} Recipes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <Link
                            key={recipe.idMeal}
                            to={`/recipe/${recipe.idMeal}`}
                            className="flex flex-col items-center p-4 shadow-md rounded-lg transition-transform duration-200 hover:scale-105"
                        >
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-32 h-32 object-cover rounded-md" />
                            <h3 className="mt-2 text-lg font-semibold">{recipe.strMeal}</h3>
                        </Link>
                    ))
                ) : (
                    <p>Loading recipes...</p>
                )}
            </div>
        </section>
    );
};

export default CategoryRecipes;
