import { Router } from 'express';
import { Fridge } from '../../models/index.js';
import { FridgeIngredients, Ingredient } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// return fridge items for a given user
router.get('/', async (req, res) => {
    const { userId } = req.body;

    try {
        // get fridge for user
        const fridge = await Fridge.findOne({ where: { userId } });
        return res.status(200).json({ fridge });

    } catch (err) {
        console.error("Error getting fridge: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/add-ingredient', authenticateToken, async (req, res) => {
    try {
        const { fridgeId, ingredientId, quantity } = req.body;

        if (!fridgeId || !ingredientId || !quantity) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the ingredient is already in the fridge
        const existingEntry = await FridgeIngredients.findOne({ where: { fridgeId, ingredientId } });
        if (existingEntry) {
            // If ingredient exists, update quantity
            existingEntry.quantity += quantity;
            await existingEntry.save();
            return res.status(200).json({ message: 'Ingredient quantity updated.' });
        }

        // Otherwise, create a new entry
        await FridgeIngredients.create({ fridgeId, ingredientId, quantity });

        return res.status(201).json({ message: 'Ingredient added to fridge.' });
    } catch (error) {
        console.error('Error adding ingredient:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/fridge/:fridgeId', authenticateToken, async (req, res) => {
    try {
        const { fridgeId } = req.params;

        const fridgeContents = await FridgeIngredients.findAll({
            where: { fridgeId },
            include: [{ model: Ingredient }],
        });

        return res.status(200).json(fridgeContents);
    } catch (error) {
        console.error('Error fetching fridge contents:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.delete('/remove-ingredient', authenticateToken, async (req, res) => {
    try {
        const { fridgeId, ingredientId } = req.body;

        if (!fridgeId || !ingredientId) {
            return res.status(400).json({ message: 'Fridge ID and Ingredient ID are required.' });
        }

        await FridgeIngredients.destroy({ where: { fridgeId, ingredientId } });

        return res.status(200).json({ message: 'Ingredient removed from fridge.' });
    } catch (error) {
        console.error('Error removing ingredient:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;