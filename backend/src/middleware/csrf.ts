import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const csrfCookie = req.cookies?.['csrf-token'];
    const csrfHeader = req.headers['x-csrf-token'];

    if (req.headers.origin && req.headers.origin !== config.frontendUrl) {
      return res.status(403).json({ error: 'Cross-origin request blocked' });
    }
  }
  next();
};
