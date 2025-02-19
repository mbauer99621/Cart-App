import { DataTypes, Model, Sequelize } from 'sequelize';
import User from './user.js';
import Recipe from './recipe.js';

export class UserRecipes extends Model {
  public userId!: number;
  public recipeId!: number;
}

export function UserRecipesFactory(sequelize: Sequelize): typeof UserRecipes {
  UserRecipes.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' },
        primaryKey: true,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Recipe, key: 'id' },
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'user_recipes',
    }
  );

  return UserRecipes;
}

export default UserRecipes;
