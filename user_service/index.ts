import express, { Request, Response } from 'express';
import {
  registerServiceInConsul,
  deregisterServiceFromConsul,
} from './src/services/consulService';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'The server is up and running!',
    timestamp: new Date().toISOString(),
  });
});

// Start the server
const server = app.listen(PORT, async () => {
  console.log(`Server is successfully running on port ${PORT}`);
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
