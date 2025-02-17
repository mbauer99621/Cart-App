import { Router } from 'express';
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

export default router;