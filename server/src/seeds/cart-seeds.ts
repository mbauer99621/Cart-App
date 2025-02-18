import Cart from "../models/cart.js"

export const seedCarts = async () => {
    await Cart.bulkCreate(
        [
            { userId: 1 },
            { userId: 2 },
            { userId: 3 },
        ]
    );
}