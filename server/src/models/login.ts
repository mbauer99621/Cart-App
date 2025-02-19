import { DataTypes, Model, type Sequelize, type Optional } from 'sequelize';
//import sequelize from '../config/connection';
import User from './user.js';

interface LoginAttributes {
    id: number;
    userId: number;
    timestamp: Date;
}

interface LoginCreationAttributes extends Optional<LoginAttributes, 'id'> {}

export class Login 
extends Model
<LoginAttributes, LoginCreationAttributes>
implements LoginAttributes {
  public id!: number;
  public userId!: number;
  public timestamp!: Date;
}

export function LoginFactory(sequelize: Sequelize): typeof Login {
Login.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, 
    { 
        sequelize, tableName: 'logins' 
    }
    );


    return Login
};

export default Login;
