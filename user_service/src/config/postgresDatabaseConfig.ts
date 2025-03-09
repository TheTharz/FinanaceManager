import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from a .env file
dotenv.config();

// Define PostgreSQL connection parameters
const pool = new Pool({
  user: process.env.USER_DB_USER,
  host: 'postgres', // Use the container name or the host IP
  database: process.env.USER_DB_NAME,
  password: process.env.USER_DB_PASS,
  port: 5432,
});

// Function to test the database connection
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

export default pool;
