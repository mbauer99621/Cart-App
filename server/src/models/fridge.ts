import { DataTypes, type Sequelize, Model, type Optional, ForeignKey, BelongsToManyAddAssociationMixin } from 'sequelize';

import type { User } from './user.js'
import { Ingredient } from './ingredient.js';

interface FridgeAttributes {
    id: number;
    userId: number;
}

interface FridgeCreationAttributes extends Optional<FridgeAttributes, 'id'> {}

export class Fridge 
    extends Model<FridgeAttributes, FridgeCreationAttributes>
    implements FridgeAttributes
{
    declare id: number;
    declare userId: ForeignKey<User['id']>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare addIngredient: BelongsToManyAddAssociationMixin<Ingredient, Ingredient['id']>;
    declare addIngredients: BelongsToManyAddAssociationMixin<Ingredient[], Ingredient['id'][]>;
}

export function FridgeFactory(sequelize: Sequelize): typeof Fridge {
    Fridge.init (
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            }, 
            userId: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            tableName: 'fridges',
        }
    );

    return Fridge
}

export default Fridge;