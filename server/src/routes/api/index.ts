import { Router } from 'express';
const router = Router();

import recipeRoutes from './recipeRoutes.js';
import fridgeRoutes from './fridgeRoutes.js';

router.use('/recipe', recipeRoutes);
router.use('/fridge', fridgeRoutes);

export default router;