import { Router } from 'express';
import { Ingredient } from '../../models/index.js';

const router = Router();

router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const ingredient = await Ingredient.create({ name: name });
        return res.status(200).json({ ingredient });

    } catch(err) {
        if (err instanceof Error && err.name === 'SequelizeUniqueConstraintError') {
            return res.status(403).json({ message: "Ingredient already exists in database." })
        } else {
            console.error("Error adding ingredient: ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
})

export default router;