import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FridgeFactory } from './fridge.js';

const User = UserFactory(sequelize);
const Fridge = FridgeFactory(sequelize);

Fridge.belongsTo(User, { foreignKey: 'userId' });

export { User, Fridge };