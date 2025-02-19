import Fridge from "../models/fridge.js"

export const seedFridges = async () => {
    const fridges = await Fridge.bulkCreate(
        [
            { userId: 1 },
            { userId: 2 },
            { userId: 3 },
        ],
        {
            returning: true,
        }
    );
    return fridges;
}