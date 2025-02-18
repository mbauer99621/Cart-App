import { useEffect, useState } from "react";
import { Recipe } from "../interfaces/RecipeCard.js";
import { retrieveRandomRecipe } from "../api/recipeAPI";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null); // Use null to avoid an empty object

    useEffect(() => {
        fetchCategories();
        getRandomRecipe();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
            const data = await response.json();

            if (data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getRandomRecipe = async () => {
        try {
            const recipe = await retrieveRandomRecipe();
            setRandomRecipe(recipe);
        } catch (err) {
            console.error("Error fetching random recipe:", err);
        }
    };

    return (
        <section id="home-section">
            <h1>HomePage</h1>

            {/* Recipe Categories Section */}
            <section id="recipe-categories-section">
                <div id="recipe-categories-container">
                    <div id="recipe-categories-wrapper">
                        <div id="recipe-categories">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <div key={category.idCategory} className="category-card">
                                        <h3>{category.strCategory}</h3>
                                        <img src={category.strCategoryThumb} alt={category.strCategory} />
                                    </div>
                                ))
                            ) : (
                                <p>Loading categories...</p>
                            )}

                            {/* Random Recipe Section */}
                            <div>
                                <h2 className="text-4xl font-bold dark:text-white">Random Recipe:</h2>
                                {randomRecipe ? (
                                    <h3 className="text-3xl font-bold dark:text-white">{randomRecipe.strMeal}</h3>
                                ) : (
                                    <p>Loading random recipe...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Home;
