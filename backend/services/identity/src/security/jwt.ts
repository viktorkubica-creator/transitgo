import jwt, { SignOptions } from 'jsonwebtoken';
import { PRIVATE_KEY_PEM, JWKS } from './jwks';
import { Request, Response, NextFunction } from 'express';

export function signToken(sub: string, claims: Record<string, any> = {}, expiresIn = '1h') {
  const opts: SignOptions = { algorithm: 'RS256', expiresIn, keyid: JWKS.keys[0].kid };
  return jwt.sign({ sub, ...claims }, PRIVATE_KEY_PEM, opts);
}

export function jwksEndpoint(_req: Request, res: Response) {
  res.json(JWKS);
}

export function requireJwt(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer (.+)$/);
  if (!m) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Missing bearer token' } });
  const token = m[1];
  try {
    // verify using the public key derived from JWKS
    const publicKey = (require('crypto') as typeof import('crypto')).createPublicKey({ key: PRIVATE_KEY_PEM, format: 'pem' });
    const pubPem = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString();
    const decoded = jwt.verify(token, pubPem, { algorithms: ['RS256'] });
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: err.message } });
  }
}
