import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FridgeFactory } from './fridge.js';
import { CartFactory } from './cart.js';
import { IngredientFactory } from './ingredient.js';

const User = UserFactory(sequelize);
const Fridge = FridgeFactory(sequelize);
const Cart = CartFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);

Fridge.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE" });

Cart.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE" });

Cart.belongsToMany(Ingredient, { through: 'cartIngredients' });
Ingredient.belongsToMany(Cart, { through: 'cartIngredients' });

Fridge.belongsToMany(Ingredient, { through: 'fridgeIngredients' });
Ingredient.belongsToMany(Fridge, { through: 'fridgeIngredients' });


export { User, Fridge, Cart, Ingredient };