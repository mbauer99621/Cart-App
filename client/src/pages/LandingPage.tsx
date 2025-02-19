import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../interfaces/RecipeCard.js";
import SaveRecipeButton from "./SaveRecipeButton.js";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

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
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                setRandomRecipe(data.meals[0]);
            }
        } catch (err) {
            console.error("Error fetching random recipe:", err);
        }
    };

    return (
        <section id="home-section">
            <h2 className="text-center text-2xl font-bold my-6">Categories</h2>

            {/* Recipe Categories Section */}
            <section id="recipe-categories-section">
                <div id="recipe-categories-container">
                    <div id="recipe-categories-wrapper">
                    <div id="recipe-categories" className="flex flex-wrap justify-center gap-6 w-full">

                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <Link
                                        key={category.idCategory}
                                        to={`/category/${category.strCategory}`}
                                        className="flex flex-col items-center justify-center p-4"
                                    >
                                        <h3 className="text-center">{category.strCategory}</h3>
                                        <img
                                            src={category.strCategoryThumb}
                                            alt={category.strCategory}
                                            className="w-24 h-24 object-cover"
                                        />
                                    </Link>
                                ))
                            ) : (
                                <p>Loading categories...</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Random Recipe Section */}
            <section className="flex justify-center items-center w-full min-h-screen py-6">
                <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-screen-xl p-6  rounded-lg">
                    {randomRecipe ? (
                        <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                            {/* Recipe Image (Left) */}
                            <img
                                src={randomRecipe.strMealThumb}
                                alt={randomRecipe.strMeal}
                                className="w-full md:w-1/3 rounded-lg shadow-md"
                            />

                            {/* Recipe Details (Right) */}
                            <div className="md:ml-6 flex-1">
                                <h2 className="text-4xl font-bold dark:text-black">{randomRecipe.strMeal}</h2>
                                <h4 className="text-2xl font-bold mt-4">Ingredients:</h4>
                                <ul className="list-disc list-inside">
                                    {Array.from({ length: 20 }).map((_, i) => {
                                        const ingredientKey = `strIngredient${i + 1}` as keyof Recipe;
                                        const measureKey = `strMeasure${i + 1}` as keyof Recipe;
                                        const ingredient = randomRecipe[ingredientKey];
                                        const measure = randomRecipe[measureKey];
                                        return ingredient ? <li key={i}>{`${measure} ${ingredient}`}</li> : null;
                                    })}
                                </ul>
                                <h4 className="text-2xl font-bold mt-4">Instructions:</h4>
                                <p className="text-lg">{randomRecipe.strInstructions}</p>

                                {/* ✅ Add the Save Recipe Button */}
                                <SaveRecipeButton recipe={randomRecipe} />
                            </div>
                        </div>
                    ) : (
                        <p>Loading random recipe...</p>
                    )}
                </div>
            </section>
        </section>
    );
};

export default Home;
