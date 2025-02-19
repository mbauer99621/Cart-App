import { Router } from 'express';
const router = Router();

import recipeRoutes from './recipeRoutes.js';
import fridgeRoutes from './fridgeRoutes.js';
import cartRoutes from './cartRoutes.js';
import ingredientRoutes from './ingredientRoutes.js'

router.use('/recipe', recipeRoutes);
router.use('/fridge', fridgeRoutes);
router.use('/cart', cartRoutes);
router.use('/ingredient', ingredientRoutes);

export default router;