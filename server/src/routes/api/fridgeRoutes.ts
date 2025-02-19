import { Router } from 'express';
import { Fridge, Ingredient } from '../../models/index.js';
const router = Router();

// return fridge items for a given user
router.get('/', async (req, res) => {
    const { userId } = req.body;

    try {
        // get fridge for user
        const fridge = await Fridge.findOne({ 
            include: [
                {
                    model: Ingredient,
                    attributes: [
                        "id",
                        "name"
                    ],
                    through: {
                        attributes: [],
                    },
                },
                
            ],
            where: { userId } 
        });
        return res.status(200).json({ fridge });

    } catch (err) {
        console.error("Error getting fridge: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;