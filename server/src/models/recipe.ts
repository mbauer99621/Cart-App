import { DataTypes, Model, type Sequelize, type Optional } from 'sequelize';
//import sequelize from '../config/connection';

interface RecipeAttributes {
    id: number;
    name: string;
    instructions: string;
    category: string;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe
extends Model
<RecipeAttributes, RecipeCreationAttributes>
implements RecipeAttributes {
  declare id: number;
  declare name: string;
  declare instructions: string;
  declare category: string;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
Recipe.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        instructions: { type: DataTypes.TEXT, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
    },
    { 
        sequelize, tableName: 'recipes' 
    }
);

    return Recipe

}

export default Recipe;
