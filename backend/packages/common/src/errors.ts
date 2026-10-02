import { NextFunction, Request, Response } from 'express';
import { logger } from './logger';

export class ApiProblem extends Error {
  constructor(public code: string, message: string, public status = 400, public details?: unknown) {
    super(message);
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = typeof err.status === 'number' ? err.status : 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'ERROR');
  const message = err.message || 'Internal server error';
  if (status >= 500) logger.error({ err }, 'Unhandled error');
  res.status(status).json({ error: { code, message, details: err.details } });
}
