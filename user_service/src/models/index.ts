import sequelize from '../config/postgresDatabaseConfig';
import { User } from './userModel';
import { UserRole } from './userRoleModel';

// Sync all models

//sequelize.sync() helps synchronize your models with the database by creating or updating tables.
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Set to `force: true` to reset the database
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

export { sequelize, syncDatabase, User, UserRole };
