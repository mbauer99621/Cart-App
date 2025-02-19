import { Ingredient } from "../models/ingredient.js";

export const seedIngredients = async () => {
    const ingredients = await Ingredient.bulkCreate (
        [
            { name: 'cheese' },
            { name: 'eggs' },
            { name: 'beef' },
            { name: 'lettuce' },
        ],
        {
            returning: true,
        }
    )
    return ingredients;
}