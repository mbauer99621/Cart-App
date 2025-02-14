import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'Joco', email: 'jacobus19@hotmail.com', password: 'wordpass123' },
      { username: 'Kayla', email: 'kayla123@scribe.com', password: 'passpass321' },
      { username: 'Mayali', email: 'mayali@comet.com', password: 'wordword321' }, 
    ],
    { individualHooks: true } // Ensures Sequelize runs `beforeCreate` hook to hash passwords
  );
};