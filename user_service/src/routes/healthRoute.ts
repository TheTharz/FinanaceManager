import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'The server is up and running!',
    timestamp: new Date().toISOString(),
  });
});

export default router;
