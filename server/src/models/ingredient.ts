import { DataTypes, Model, Sequelize, type Optional } from 'sequelize'

interface IngredientAttributes {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> {};

export class Ingredient 
    extends Model<IngredientAttributes, IngredientCreationAttributes>
    implements IngredientAttributes
{
    declare id: number;
    declare name: string;
    declare quantity: number;
    declare unit: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function IngredientFactory(sequelize: Sequelize): typeof Ingredient {
    Ingredient.init (
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantity: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            tableName: 'ingredients',
        }
    )

    return Ingredient
}

export default Ingredient;