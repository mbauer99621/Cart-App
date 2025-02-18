import { Router } from 'express';
const router = Router();

import recipeRoutes from './recipeRoutes.js';
import fridgeRoutes from './fridgeRoutes.js';
import cartRoutes from './cartRoutes.js'

router.use('/recipe', recipeRoutes);
router.use('/fridge', fridgeRoutes);
router.use('/cart', cartRoutes);

export default router;