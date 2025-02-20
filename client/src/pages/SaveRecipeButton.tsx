import { Recipe } from "../interfaces/RecipeCard";

interface SaveRecipeButtonProps {
    recipe: Recipe; // Accepts a recipe object
  }
  
  export default function SaveRecipeButton({ recipe }: SaveRecipeButtonProps) {
    const handleSaveRecipe = async () => {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
    
      if (!userId || !token) {
        alert("⚠️ User not found. Please log in.");
        return;
      }
    
      try {
        const response = await fetch("/api/recipes/save-recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify({
            userId: parseInt(userId, 10),
            recipeId: recipe.idMeal,
            recipeName: recipe.strMeal,      
            instructions: recipe.strInstructions, 
            category: recipe.strCategory,   
          }),
        });
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
    
        alert("✅ Recipe saved successfully!");
      } catch (error) {
        console.error("❌ Error saving recipe:", error);
        alert("⚠️ Failed to save recipe.");
      }
    };
    
    // const handleSaveRecipe = async () => {
    //   if (!recipe) return;
    
    //   const savedRecipes: Recipe[] = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    
    //   if (savedRecipes.some((saved) => saved.idMeal === recipe.idMeal)) {
    //     alert("⚠️ This recipe is already saved!");
    //     return;
    //   }
    
                          // Retrieve user from sessionStorage
                          //const storedUser = JSON.parse(sessionStorage.getItem("userId") || "null");
                          //const storedUser = sessionStorage.getItem("userId");
                          //const userId = sessionStorage.getItem("userId");

                          // if (!storedUser || !storedUser.id) {
                          //   alert("❌ User not found. Please log in.");
                          //   return;
                          // }
    
    //   try {
    //     const response = await fetch("/api/recipes/save-recipe", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ userId: userId, recipeId: recipe.idMeal }),
    //     });
    
    //     const responseData = await response.json();
    //     console.log("🔍 Save Recipe API Response:", responseData);
    
    //     if (!response.ok) {
    //       alert(`Failed to save recipe: ${responseData.message}`);
    //       return;
    //     }
    
    //     // Update localStorage
    //     const updatedRecipes = [...savedRecipes, recipe];
    //     localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    
    //     console.log("✅ Recipe saved successfully:", updatedRecipes);
    //     alert("🍽️ Recipe saved successfully!");
    //   } catch (error) {
    //     console.error("❌ Error saving recipe:", error);
    //     alert("Failed to save recipe. Please try again.");
    //   }
    // };
    
  //   const handleSaveRecipe = async () => {
  //     if (!recipe) return;
  
  //   // Get the logged-in user's ID from sessionStorage
  //   const userId = sessionStorage.getItem("userId");
  //   if (!userId) {
  //     alert("⚠️ User is not logged in!");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch("/api/recipe/save", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ userId, recipe }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to save recipe.");
  //     }

  //     console.log("✅ Recipe saved to backend:", data);
  //     alert("🍽️ Recipe saved successfully!");
  //   } catch (error) {
  //     console.error("❌ Error saving recipe:", error);
  //     alert("Failed to save recipe.");
  //   }
  // };
  
    return (
      <button
        onClick={handleSaveRecipe}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        👩‍🍳Save Recipe👨‍🍳
      </button>
    );
  }
  