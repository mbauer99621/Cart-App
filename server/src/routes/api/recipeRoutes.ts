import { Router } from 'express';
import { UserRecipes, Recipe } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

import recipeService from '../../service/recipeService.js';

router.get('/random', async (_req, res) => {
    try {
        const meals = await recipeService.fetchRandomRecipe();
        return res.status(200).json({ meals });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

router.get('/categories', async (_req, res) => {
    try {
        const categories = await recipeService.fetchCategories();
        return res.status(200).json({ categories });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

router.get('/:category', async (req, res) => {
    try {
        const meals = await recipeService.fetchMealsByCategory(req.params.category);
        return res.status(200).json({ meals });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

router.get('/meal/:id', async (req, res) => {
    try {
        const meals = await recipeService.fetchRecipeById(req.params.id);
        return res.status(200).json({ meals });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

router.post('/save-recipe', authenticateToken, async (req, res) => {
    console.log("🔥 /save-recipe endpoint hit!");
    try {
        const { userId, recipeId, recipeName, instructions, category, mealThumb } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
        }

        // Ensure recipeId is extracted properly
        const extractedRecipeId = typeof recipeId === 'object' ? recipeId.idMeal : recipeId;
        console.log("🔍 Extracted Recipe ID:", extractedRecipeId);

        // 🔎 Check if the recipe exists in the database
        let recipe = await Recipe.findOne({ where: { idMeal: extractedRecipeId } });

        // ✅ If the recipe does NOT exist, insert it first
        if (!recipe) {
            recipe = await Recipe.create({
                idMeal: extractedRecipeId,
                strMeal: recipeName || "Unknown Recipe",
                strMealThumb: mealThumb || "",
                strInstructions: instructions || "No instructions provided",
                strCategory: category || "Uncategorized",
            });
            console.log("✅ New Recipe Created:", recipe.idMeal);
        }

        // 🔎 Check if the user already saved this recipe
        const existingEntry = await UserRecipes.findOne({ where: { userId, recipeId: extractedRecipeId } });

        if (existingEntry) {
            return res.status(409).json({ message: 'Recipe already saved.' });
        }

        // ✅ Save the recipe for the user
        await UserRecipes.create({ userId, recipeId: extractedRecipeId });

        return res.status(201).json({ message: 'Recipe saved successfully!' });

    } catch (error) {
        console.error('❌ Error saving recipe:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});


//old version
// router.post('/save-recipe', authenticateToken, async (req, res) => {
//     console.log("🔥 /save-recipe endpoint hit!");
//     try {
//         const { userId, recipeId } = req.body;

//         if (!userId || !recipeId) {
//             return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
//         }

//         // Ensure recipeId is extracted properly
//         const extractedRecipeId = typeof recipeId === 'object' ? recipeId.idMeal : recipeId;
//         console.log("🔍 Extracted Recipe ID:", extractedRecipeId);

//         // Check if the recipe is already saved
//         const existingEntry = await UserRecipes.findOne({ where: { userId, recipeId: extractedRecipeId } });
        
//         if (existingEntry) {
//             return res.status(409).json({ message: 'Recipe already saved.' });
//         }

//         await UserRecipes.create({ userId, recipeId: extractedRecipeId });

//         return res.status(201).json({ message: 'Recipe saved successfully.' });
//     } catch (error) {
//         console.error('Error saving recipe:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// });

// router.get('/save-recipe/:userId', authenticateToken, async (req, res) => {
//     try {
//         const { userId } = req.params;
//         console.log("🔍 Fetching saved recipes for user ID:", userId);

//         const userWithRecipes = await User.findOne({
//             where: { id: userId },
//             include: {
//                 model: Recipe,
//                 attributes: ['id', 'name', 'instructions', 'category'],
//                 through: { attributes: [] } // Prevents UserRecipes join table data from being included
//             },
//         });

//         if (!userWithRecipes || !userWithRecipes.Recipes) {
//             console.log("⚠️ No saved recipes found for this user.");
//             return res.status(404).json({ message: "No saved recipes found for this user." });
//         }


//         console.log("✅ Saved recipes found:", JSON.stringify(userWithRecipes.Recipes, null, 2));
//         return res.json({ meals: userWithRecipes.Recipes });
//     } catch (err) {
//         console.error("❌ Error fetching saved recipes:", err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });

router.get("/save-recipe/:userId", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Missing user ID." });
        }

        const savedRecipes = await UserRecipes.findAll({
            where: { userId },
            include: [
                {
                    model: Recipe,
                         attributes: [
                            'idMeal', 'strMeal', 'strMealThumb', 'strInstructions', 'strCategory',
                            'strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4', 
                            'strIngredient5', 'strIngredient6', 'strIngredient7', 'strIngredient8', 
                            'strIngredient9', 'strIngredient10', 'strIngredient11', 'strIngredient12', 
                            'strIngredient13', 'strIngredient14', 'strIngredient15', 'strIngredient16', 
                            'strIngredient17', 'strIngredient18', 'strIngredient19', 'strIngredient20',
                            'strMeasure1', 'strMeasure2', 'strMeasure3', 'strMeasure4', 'strMeasure5',
                            'strMeasure6', 'strMeasure7', 'strMeasure8', 'strMeasure9', 'strMeasure10',
                            'strMeasure11', 'strMeasure12', 'strMeasure13', 'strMeasure14', 'strMeasure15',
                            'strMeasure16', 'strMeasure17', 'strMeasure18', 'strMeasure19', 'strMeasure20'
                        ]
                }
            ]
        });

        if (!savedRecipes.length) {
            return res.status(404).json({ message: "No saved recipes found." });
        }

        console.log("✅ Saved Recipes Fetched:", JSON.stringify(savedRecipes, null, 2));

        return res.json({ 
            meals: savedRecipes.map(entry => ({
                idMeal: entry.recipeId, // ✅ Include the saved reference
                Recipe: entry.Recipe // ✅ Return the associated Recipe details
            }))
        });

    } catch (error) {
        console.error("❌ Error fetching saved recipes:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});


// old Route to Fetch Saved Recipes
// router.get("/save-recipe/:userId", authenticateToken, async (req, res) => {
//     try {
//         const { userId } = req.params;

//         if (!userId) {
//             return res.status(400).json({ message: "Missing user ID." });
//         }

//         // Get all saved recipes for the user
//         const savedRecipes = await UserRecipes.findAll({ where: { userId } });

//         if (!savedRecipes || savedRecipes.length === 0) {
//             return res.status(404).json({ message: "No saved recipes found." });
//         }

//         return res.status(200).json({ meals: savedRecipes });
//     } catch (error) {
//         console.error("❌ Error fetching saved recipes:", error);
//         return res.status(500).json({ message: "Internal server error." });
//     }
// });
  

// router.delete('/remove-recipe', authenticateToken, async (req, res) => {
//     try {
//         const { userId, recipeId } = req.body;

//         if (!userId || !recipeId) {
//             return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
//         }

//         await UserRecipes.destroy({ where: { userId, recipeId } });

//         return res.status(200).json({ message: 'Recipe removed from saved list.' });
//     } catch (error) {
//         console.error('Error removing recipe:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// });

router.delete('/remove-recipe', authenticateToken, async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
        }

        const deleted = await UserRecipes.destroy({ where: { userId, recipeId } });

        if (!deleted) {
            return res.status(404).json({ message: 'Recipe not found or already removed.' });
        }

        return res.status(200).json({ message: 'Recipe removed from saved list.' });
    } catch (error) {
        console.error('Error removing recipe:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});



export default router;