//import { useEffect, useState } from "react";
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

// export const fetchSavedRecipes = async (userId: number): Promise<Meal[]> => {
//     try {
//         const token = Auth.getToken();
//         console.log("🔍 Fetching saved recipes with token:", token);

//         const response = await fetch(`/api/recipe/saved-recipes/${userId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (!response.ok) {
//             const data = await response.json();
//             throw new Error(data.message || "Failed to fetch saved recipes.");
//         }

//         const data = await response.json();
//         console.log("✅ Saved recipes fetched successfully:", data);

//         return data.meals as [];
//     } catch (err) {
//         console.error("❌ Error fetching saved recipes:", err);
//         return [];
//     }
// };

export const fetchSavedRecipes = async () => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
  
    if (!userId || !token) {
      console.error("User ID not found in sessionStorage");
      return Promise.reject("User not found. Please log in.");
    }
  
    try {
      const response = await fetch(`/api/recipes/save-recipe/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch saved recipes");
      }
  
      const data = await response.json();
      console.log("📦 Fetched saved recipes data:", data);

      return data.meals || [];
    } catch (error) {
      console.error("❌ Error loading saved recipes:", error);
      return Promise.reject("Failed to load saved recipes.");
    }
};

  
  

export { retrieveRandomRecipe, retrieveRecipeCategories, retrieveMealsByCategory, retreiveRecipeById }