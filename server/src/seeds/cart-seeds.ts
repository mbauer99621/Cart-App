import Cart from "../models/cart.js"

export const seedCarts = async () => {
    const carts = await Cart.bulkCreate(
        [
            { userId: 1 },
            { userId: 2 },
            { userId: 3 },
        ],
        {
            returning: true,
        }
    );
    return carts;
}