import { DataTypes, Model, Sequelize } from 'sequelize';
import Fridge from './fridge.js';
import Ingredient from './ingredient.js';

export class FridgeIngredients extends Model {
  public fridgeId!: number;
  public ingredientId!: number;
  public quantity!: number;
}

export function FridgeIngredientsFactory(sequelize: Sequelize): typeof FridgeIngredients {
  FridgeIngredients.init(
    {
      fridgeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Fridge, key: 'id' },
        primaryKey: true,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Ingredient, key: 'id' },
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'fridge_ingredients',
    }
  );

  return FridgeIngredients;
}

export default FridgeIngredients;
