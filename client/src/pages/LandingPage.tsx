import { useEffect, useState } from "react";

import { Recipe } from "../interfaces/RecipeCard.js"
import { retrieveRandomRecipe } from "../api/recipeAPI";

const Home = () => {
    const [randomRecipe, setRandomRecipe] = useState<Recipe>({} as Recipe);

    useEffect(() => {
        getRandomRecipe();
    }, [])

    const getRandomRecipe = async () => {
        try {
            const recipe = await retrieveRandomRecipe();
            setRandomRecipe(recipe);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>HomePage</h1>
            {/* Temporary: simply show recipe title to test API */}
            <h2 className="text-4xl font-bold dark:text-white">Random Recipe:</h2>
            <h3 className="text-3xl font-bold dark:text-white">{randomRecipe.strMeal}</h3>
        </div>
    )
};

export default Home;