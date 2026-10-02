import express from 'express';
import { signToken, jwksEndpoint, requireJwt } from '../security/jwt';

export const authRouter = express.Router();

// POST /v1/identity/login
// Implements FR-020 (TRGO-14)
authRouter.post('/identity/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  const token = signToken(email, { email });
  res.json({ token });
});

// GET /.well-known/jwks.json (mock) – used by resource servers to validate JWTs
authRouter.get('/identity/.well-known/jwks.json', jwksEndpoint);

// GET /v1/identity/profile – returns basic claims
authRouter.get('/identity/profile', requireJwt, (req, res) => {
  const u = (req as any).user || {};
  res.json({ sub: u.sub, email: u.email || u.sub, consents: consentStore[u.sub] || [] });
});

// PUT /v1/identity/consents – store user consents (GDPR)
type Consent = { id: string; granted: boolean; timestamp: string };
const consentStore: Record<string, Consent[]> = {};
authRouter.put('/identity/consents', requireJwt, (req, res) => {
  const u = (req as any).user || {};
  const consents = Array.isArray(req.body?.consents) ? req.body.consents : [];
  consentStore[u.sub] = consents.map((c: any) => ({
    id: String(c.id),
    granted: !!c.granted,
    timestamp: new Date().toISOString()
  }));
  res.status(204).send();
});
