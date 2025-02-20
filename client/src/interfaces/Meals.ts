import { Recipe } from "./RecipeCard";


export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    recipeId?: string; // ✅ This is optional since it's only needed in saved recipes
    Recipe: Recipe; // ✅ Use the `Recipe` interface directly
}

export interface Meals {
    meals: Meal[]
}