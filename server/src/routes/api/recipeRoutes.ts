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
    try {
        const { userId, recipeId } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
        }

        // Check if the recipe is already saved
        const existingEntry = await UserRecipes.findOne({ where: { userId, recipeId } });
        if (existingEntry) {
            return res.status(409).json({ message: 'Recipe already saved.' });
        }

        await UserRecipes.create({ userId, recipeId });

        return res.status(201).json({ message: 'Recipe saved successfully.' });
    } catch (error) {
        console.error('Error saving recipe:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/saved-recipes/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;

        const savedRecipes = await UserRecipes.findAll({
            where: { userId },
            include: [{ model: Recipe }],
        });

        return res.status(200).json(savedRecipes);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.delete('/remove-recipe', authenticateToken, async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: 'User ID and Recipe ID are required.' });
        }

        await UserRecipes.destroy({ where: { userId, recipeId } });

        return res.status(200).json({ message: 'Recipe removed from saved list.' });
    } catch (error) {
        console.error('Error removing recipe:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});


export default router;