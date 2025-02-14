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

export default router;