import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/userModel';
import { UserRole } from '../models/userRoleModel';

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize({
  database: process.env.USER_DB_NAME as string,
  username: process.env.USER_DB_USER as string,
  password: process.env.USER_DB_PASS as string,
  host: process.env.USER_DB_HOST || 'postgres',
  dialect: 'postgres',
  port: Number(process.env.USER_DB_PORT) || 5432,
  models: [User, UserRole], // Register models here
  logging: false, // Disable SQL logging in production
});

// Function to test database connection
export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
