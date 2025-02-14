import { Router } from 'express';
const router = Router();

import recipeRoutes from './recipeRoutes.js';

router.use('/recipe', recipeRoutes);

export default router;