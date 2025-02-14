import { RecipeCard } from "../interfaces/RecipeCard.js";

const retrieveRandomRecipe = async (): Promise<RecipeCard> => {
    try {
        const response = await fetch(
            `/api/recipe/random`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const recipe = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return recipe;

    } catch(err) {
        console.error('Error getting random recipe: ', err);
        return Promise.reject('Could not fetch random recipe.');
    }
}

export { retrieveRandomRecipe }