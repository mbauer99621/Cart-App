import { Ingredient } from "../models/ingredient.js";

export const seedIngredients = async () => {
    const ingredients = await Ingredient.bulkCreate (
        [
            { name: 'cheese', quantity: 1, unit: 'two ounces' },
            { name: 'eggs', quantity: 1, unit: 'two ounces' },
            { name: 'beef', quantity: 1, unit: 'two ounces' },
            { name: 'lettuce', quantity: 1, unit: 'two ounces' },
        ],
        {
            returning: true,
        }
    )
    return ingredients;
}