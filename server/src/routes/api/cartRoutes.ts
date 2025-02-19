import { Router } from 'express';
import { Cart, Ingredient } from '../../models/index.js';

const router = Router();

// return cart items for a given user
router.get('/', async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({
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
        return res.status(200).json({ cart });

    } catch (err) {
        console.error("Error getting cart: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;