import { DataTypes, Model, type Sequelize, type Optional } from 'sequelize';
//import sequelize from '../config/connection';

interface RecipeAttributes {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
        
        strIngredient1?: string;
        strIngredient2?: string;
        strIngredient3?: string;
        strIngredient4?: string;
        strIngredient5?: string;
        strIngredient6?: string;
        strIngredient7?: string;
        strIngredient8?: string;
        strIngredient9?: string;
        strIngredient10?: string;
        strIngredient11?: string;
        strIngredient12?: string;
        strIngredient13?: string;
        strIngredient14?: string;
        strIngredient15?: string;
        strIngredient16?: string;
        strIngredient17?: string;
        strIngredient18?: string;
        strIngredient19?: string;
        strIngredient20?: string;
    
        strMeasure1?: string;
        strMeasure2?: string;
        strMeasure3?: string;
        strMeasure4?: string;
        strMeasure5?: string;
        strMeasure6?: string;
        strMeasure7?: string;
        strMeasure8?: string;
        strMeasure9?: string;
        strMeasure10?: string;
        strMeasure11?: string;
        strMeasure12?: string;
        strMeasure13?: string;
        strMeasure14?: string;
        strMeasure15?: string;
        strMeasure16?: string;
        strMeasure17?: string;
        strMeasure18?: string;
        strMeasure19?: string;
        strMeasure20?: string;
    }


interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'idMeal'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes>implements RecipeAttributes {
    public idMeal!: string;
    public strMeal!: string;
    public strMealThumb!: string;
    public strInstructions!: string;
    public strCategory!: string;
    
    [key: `strIngredient${number}`]: string | undefined; // ✅ Allow dynamic ingredient keys
    [key: `strMeasure${number}`]: string | undefined; // ✅ Allow dynamic measure keys
      
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
    Recipe.init(
        {
          idMeal: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
          },
          strMeal: { 
            type: DataTypes.STRING,
            allowNull: false,
          },
          strMealThumb: { 
            type: DataTypes.STRING,
            allowNull: true,
          },
          strInstructions: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          strCategory: { 
            type: DataTypes.STRING,
            allowNull: true,
          },
          strIngredient1: { type: DataTypes.STRING, allowNull: true },
          strIngredient2: { type: DataTypes.STRING, allowNull: true },
          strIngredient3: { type: DataTypes.STRING, allowNull: true },
          strIngredient4: { type: DataTypes.STRING, allowNull: true },
          strIngredient5: { type: DataTypes.STRING, allowNull: true },
          strIngredient6: { type: DataTypes.STRING, allowNull: true },
          strIngredient7: { type: DataTypes.STRING, allowNull: true },
          strIngredient8: { type: DataTypes.STRING, allowNull: true },
          strIngredient9: { type: DataTypes.STRING, allowNull: true },
          strIngredient10: { type: DataTypes.STRING, allowNull: true },
          strIngredient11: { type: DataTypes.STRING, allowNull: true },
          strIngredient12: { type: DataTypes.STRING, allowNull: true },
          strIngredient13: { type: DataTypes.STRING, allowNull: true },
          strIngredient14: { type: DataTypes.STRING, allowNull: true },
          strIngredient15: { type: DataTypes.STRING, allowNull: true },
          strIngredient16: { type: DataTypes.STRING, allowNull: true },
          strIngredient17: { type: DataTypes.STRING, allowNull: true },
          strIngredient18: { type: DataTypes.STRING, allowNull: true },
          strIngredient19: { type: DataTypes.STRING, allowNull: true },
          strIngredient20: { type: DataTypes.STRING, allowNull: true },

          strMeasure1: { type: DataTypes.STRING, allowNull: true },
          strMeasure2: { type: DataTypes.STRING, allowNull: true },
          strMeasure3: { type: DataTypes.STRING, allowNull: true },
          strMeasure4: { type: DataTypes.STRING, allowNull: true },
          strMeasure5: { type: DataTypes.STRING, allowNull: true },
          strMeasure6: { type: DataTypes.STRING, allowNull: true },
          strMeasure7: { type: DataTypes.STRING, allowNull: true },
          strMeasure8: { type: DataTypes.STRING, allowNull: true },
          strMeasure9: { type: DataTypes.STRING, allowNull: true },
          strMeasure10: { type: DataTypes.STRING, allowNull: true },
          strMeasure11: { type: DataTypes.STRING, allowNull: true },
          strMeasure12: { type: DataTypes.STRING, allowNull: true },
          strMeasure13: { type: DataTypes.STRING, allowNull: true },
          strMeasure14: { type: DataTypes.STRING, allowNull: true },
          strMeasure15: { type: DataTypes.STRING, allowNull: true },
          strMeasure16: { type: DataTypes.STRING, allowNull: true },
          strMeasure17: { type: DataTypes.STRING, allowNull: true },
          strMeasure18: { type: DataTypes.STRING, allowNull: true },
          strMeasure19: { type: DataTypes.STRING, allowNull: true },
          strMeasure20: { type: DataTypes.STRING, allowNull: true },
        },
        {
          sequelize,
          modelName: "recipes",
          timestamps: false,
          freezeTableName: true, 
        }
      );

    return Recipe

}

export default Recipe;
