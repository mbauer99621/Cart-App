import { Router } from 'express';
import recipeRoutes from './recipeRoutes.js';
import fridgeRoutes from './fridgeRoutes.js';
import cartRoutes from './cartRoutes.js';
import ingredientRoutes from './ingredientRoutes.js'

const router = Router();

router.use('/recipe', recipeRoutes);
router.use('/fridge', fridgeRoutes);
router.use('/cart', cartRoutes);
router.use('/ingredient', ingredientRoutes);

export default router;