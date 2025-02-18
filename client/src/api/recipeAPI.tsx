import { Categories } from "../interfaces/Categories.js";
import { Meals } from "../interfaces/Meals.js";
import { Recipe, RecipeCard } from "../interfaces/RecipeCard.js";
import Auth from '../utils/auth';

const retrieveRandomRecipe = async (): Promise<Recipe> => {
    try {
        const response = await fetch(
            `/api/recipe/random`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const recipe: RecipeCard = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return recipe.meals[0];

    } catch(err) {
        console.error('Error getting random recipe: ', err);
        return Promise.reject('Could not fetch random recipe.');
    }
}

const retrieveRecipeCategories = async (): Promise<Categories> => {
    try {
        const response = await fetch(
            `/api/recipe/categories`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const categories: Categories = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return categories;

    } catch (err) {
        console.error(err);
        return Promise.reject('Could not fetch recipe categories.');
    }
}

const retrieveMealsByCategory = async (category: string): Promise<Meals> => {
    try {
        const response = await fetch(
            `/api/recipe/${category}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const meals: Meals = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return meals;

    } catch (err) {
        console.error(err);
        return Promise.reject('Could not fetch recipe categories.');
    }
}

const retreiveRecipeById = async (id: string): Promise<Recipe> => {
    try {
        const response = await fetch(
            `/api/recipe/meal/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const recipe: RecipeCard = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return recipe.meals[0];

    } catch (err) {
        console.error(err);
        return Promise.reject('Could not fetch recipe categories.');
    }
}


export { retrieveRandomRecipe, retrieveRecipeCategories, retrieveMealsByCategory, retreiveRecipeById }