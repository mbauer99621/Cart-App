import sequelize from '../config/connection.js';
import { seedUsers } from './user-seeds.js';
import { seedFridges } from './fridge-seeds.js';
import { seedCarts } from './cart-seeds.js';
import { seedIngredients } from './ingredient-seeds.js';
import { Ingredient } from '../models/ingredient.js';
import { Fridge } from '../models/fridge.js'
import { Cart } from '../models/cart.js'


const seedRandomFridgeIngredients = async (fridges: Fridge[], ingredients: Ingredient[]) => {
  for (const fridge of fridges) {
    const randomIngredients = ingredients.slice(Math.floor(Math.random() * ingredients.length));
    await fridge.addIngredients(randomIngredients);
  }
}

const seedRandomCartIngredients = async (carts: Cart[], ingredients: Ingredient[]) => {
  for (const cart of carts) {
    const randomIngredients = ingredients.slice(Math.floor(Math.random() * ingredients.length));
    await cart.addIngredients(randomIngredients);
  }
}

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    const fridges = await seedFridges();
    console.log('\n----- FRIDGES SEEDED -----\n');

    const carts = await seedCarts();
    console.log('\n----- CARTS SEEDED -----\n');

    const ingredients = await seedIngredients();
    console.log('\n----- INGREDIENTS SEEDED -----\n');

    await seedRandomFridgeIngredients(fridges, ingredients);
    console.log('\n----- FRIDGEINGREDIENTS SEEDED -----\n');

    await seedRandomCartIngredients(carts, ingredients);
    console.log('\n----- CARTINGREDIENTS SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
