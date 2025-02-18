
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const CategoryRecipes = () => {
    const { categoryName } = useParams();
    const [recipes, setRecipes] = useState<Meal[]>([]);

    useEffect(() => {
        if (categoryName) {
            fetchCategoryRecipes(categoryName);
        }
    }, [categoryName]);

    const fetchCategoryRecipes = async (categoryName: string) => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
            );
            const data = await response.json();

            if (data.meals) {
                setRecipes(data.meals);
            }
        } catch (error) {
            console.error("Error fetching category recipes:", error);
        }
    };

    return (
        <section>
            <h1 className="text-center text-5xl font-bold my-6">Recipes in {categoryName}</h1>
            <div className="recipe-list">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.idMeal} className="recipe-card">
                            <h3>{recipe.strMeal}</h3>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        </div>
                    ))
                ) : (
                    <p>No recipes found for this category.</p>
                )}
            </div>
        </section>
    );
};

export default CategoryRecipes;
