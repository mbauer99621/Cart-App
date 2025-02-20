import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FridgeFactory } from './fridge.js';
import { CartFactory } from './cart.js';
import { IngredientFactory } from './ingredient.js';
import { RecipeFactory } from './recipe.js';
import { LoginFactory } from './login.js';
import { UserRecipesFactory } from './UserRecipes.js';
import { FridgeIngredientsFactory } from './FridgeIngredients.js';

const User = UserFactory(sequelize);
const Fridge = FridgeFactory(sequelize);
const Cart = CartFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Login = LoginFactory(sequelize);
const UserRecipes = UserRecipesFactory(sequelize);
const FridgeIngredients = FridgeIngredientsFactory(sequelize);

User.hasMany(Login, { foreignKey: 'userId' });
Login.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Fridge, { foreignKey: 'userId' });
Fridge.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE" });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE" });

User.belongsToMany(Recipe, { through: UserRecipes, foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: UserRecipes, foreignKey: 'recipeId' });

Cart.belongsToMany(Ingredient, { through: 'cartIngredients', foreignKey: 'cartId' });
Ingredient.belongsToMany(Cart, { through: 'cartIngredients', foreignKey: 'ingredientId' });

Fridge.belongsToMany(Ingredient, { through: 'fridgeIngredients', foreignKey: 'fridgeId' });
Ingredient.belongsToMany(Fridge, { through: 'fridgeIngredients', foreignKey: 'ingredientId' });

UserRecipes.belongsTo(Recipe, {foreignKey: 'recipeId'});

// Manually Sync Database
async function syncDatabase() {
    try {
      await sequelize.sync({ alter: true }); // Will update tables if they already exist
      console.log('✅ Database & tables synced successfully.');
    } catch (error) {
      console.error('❌ Error syncing database:', error);
    }
  }
  
  syncDatabase(); // Call function to sync database


export { User, Recipe, Fridge, Cart, Ingredient, Login, UserRecipes, FridgeIngredients };