import { Router } from 'express';
import { Fridge, Ingredient } from '../../models/index.js';

const router = Router();

// create a fridge for a user (done upon creating user)
router.post('/', async (req, res) => {
    const { userId } = req.body;

    try {
        const fridge = await Fridge.create({ userId });
        return res.status(200).json({ fridge });
    } catch (err) {
        if (err instanceof Error && err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(403).json({ message: "Invalid userId." })
        }

        if (err instanceof Error && err.name === 'SequelizeUniqueConstraintError') {
            return res.status(403).json({ message: "Fridge already exists for user." })
        }

        console.error("Error creating fridge: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// return fridge items for a given user
router.get('/items', async (req, res) => {
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

// add item to fridge.
router.post('/item', async (req, res) =>{
    const { name, userId } = req.body;

    try {
        const ingredient = await Ingredient.findOne({ where: { name } });
        const fridge = await Fridge.findOne({ where: { userId } });
        
        if (ingredient && fridge) {
            fridge.addIngredient(ingredient);
            return res.status(200).json({ ingredient });
        } else {
            return res.status(400).json({ message: "Could not find ingredient and/or cart." });
        }

    } catch (err) {
        console.error("Error adding to cart: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// delete item from fridge
router.delete('/item', async (req, res) => {
    const { name, userId } = req.body;

    try {
        const ingredient = await Ingredient.findOne({ where: { name } });
        const fridge = await Fridge.findOne({ where: { userId } });
        
        if (ingredient && fridge) {
            fridge.removeIngredient(ingredient);
            return res.status(200).json({ ingredient });
        } else {
            return res.status(400).json({ message: "Could not delete ingredient from cart." });
        }

    } catch (err) {
        console.error("Error deleting from cart: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

export default router;