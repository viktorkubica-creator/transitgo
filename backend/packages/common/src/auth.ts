import { NextFunction, Request, Response } from 'express';

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer (.+)$/);
  if (m) (req as any).user = { sub: 'user@example.com', token: m[1] };
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).user) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Missing or invalid token' } });
  }
  next();
}
