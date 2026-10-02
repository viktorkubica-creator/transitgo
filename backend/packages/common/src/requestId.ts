import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = (req.headers['x-request-id'] as string | undefined) || uuidv4();
  (req as any).requestId = existing;
  res.setHeader('x-request-id', existing);
  next();
}
