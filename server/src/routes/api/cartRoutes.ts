import { Router } from 'express';
import { Cart, Ingredient } from '../../models/index.js';

const router = Router();

// create a cart for a user (done upon creating user)
router.post('/', async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.create({ userId });
        return res.status(200).json({ cart });

    } catch (err) {
        if (err instanceof Error && err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(403).json({ message: "Invalid userId." })
        }

        if (err instanceof Error && err.name === 'SequelizeUniqueConstraintError') {
            return res.status(403).json({ message: "Cart already exists for user." })
        }

        console.error("Error creating cart: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// return cart items for a given user
router.get('/items', async (req, res) => {
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

// add item to cart. NOTE: (run the '/api/ingredient/' post call first)
router.post('/item', async (req, res) =>{
    const { name, userId } = req.body;

    try {
        const ingredient = await Ingredient.findOne({ where: { name } });
        const cart = await Cart.findOne({ where: { userId } });
        
        if (ingredient && cart) {
            cart.addIngredient(ingredient);
            return res.status(200).json({ ingredient });
        } else {
            return res.status(400).json({ message: "Could not find ingredient and/or cart." });
        }

    } catch (err) {
        console.error("Error adding to cart: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// delete item from cart
router.delete('/item', async (req, res) => {
    const { name, userId } = req.body;

    try {
        const ingredient = await Ingredient.findOne({ where: { name } });
        const cart = await Cart.findOne({ where: { userId } });
        
        if (ingredient && cart) {
            cart.removeIngredient(ingredient);
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