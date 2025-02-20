import { DataTypes, Model, Sequelize } from 'sequelize';
import User from './user.js';
import Recipe from './recipe.js';

export class UserRecipes extends Model {
  public userId!: number;
  public recipeId!: number;
  public Recipe?: Recipe;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: Recipe, key: 'idMeal' },
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // ✅ Explicitly define strIngredient1 to strIngredient20
      ...Object.fromEntries(
        Array.from({ length: 20 }, (_, i) => [
          `strIngredient${i + 1}`,
          { type: DataTypes.STRING, allowNull: true },
        ])
      ),
      // ✅ Explicitly define strMeasure1 to strMeasure20
      ...Object.fromEntries(
        Array.from({ length: 20 }, (_, i) => [
          `strMeasure${i + 1}`,
          { type: DataTypes.STRING, allowNull: true },
        ])
      ),
    },
    {
      sequelize,
      tableName: 'user_recipes',
      freezeTableName: true,
    }
  );

  return UserRecipes;
}

export default UserRecipes;
