import express, { Request, Response } from 'express';
import {
  registerServiceInConsul,
  deregisterServiceFromConsul,
} from './src/services/consulService';
import dotenv from 'dotenv';
import healthRoute from './src/routes/healthRoute';
import { testDbConnection } from './src/config/postgresDatabaseConfig';
import { syncDatabase } from './src/models';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Register routes
app.use('/', healthRoute);

// Start the server
const server = app.listen(PORT, async () => {
  console.log(`Server is successfully running on port ${PORT}`);
  await testDbConnection().then(syncDatabase);
  await registerServiceInConsul();
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await deregisterServiceFromConsul();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down...');
  await deregisterServiceFromConsul();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
