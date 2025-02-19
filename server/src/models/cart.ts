import { DataTypes, type Sequelize, Model, type Optional, ForeignKey, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin } from 'sequelize';

//import type { User } from './user.js'
import  User from './user.js'
import { Ingredient } from './ingredient.js';

interface CartAttributes {
    id: number;
    userId: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

export class Cart 
    extends Model<CartAttributes, CartCreationAttributes>
    implements CartAttributes
{
    declare id: number;
    declare userId: ForeignKey<User['id']>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare addIngredient: BelongsToManyAddAssociationMixin<Ingredient, Ingredient['id']>;
    declare addIngredients: BelongsToManyAddAssociationMixin<Ingredient[], Ingredient['id'][]>;

    declare removeIngredient: BelongsToManyRemoveAssociationMixin<Ingredient, Ingredient['id']>;
}

export function CartFactory(sequelize: Sequelize): typeof Cart {
    Cart.init (
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            }, 
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false, 
                references: { model: User, key: 'id'},
                unique: true
            }
        },
        {
            sequelize,
            tableName: 'carts',
        }
    );


    return Cart;
}

export default Cart;