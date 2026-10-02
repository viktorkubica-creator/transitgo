import express from 'express';
import { requireJwt, signToken } from '../security/jwt';
import { z } from 'zod';
import { parseOrThrow } from '@transitgo/common/src/validation';

export const accountRouter = express.Router();

// POST /v1/identity/token/refresh
accountRouter.post('/identity/token/refresh', requireJwt, (req, res) => {
  const u = (req as any).user;
  const token = signToken(u.sub, { email: u.email });
  res.json({ token });
});

// DELETE /v1/identity/account
const delSchema = z.object({ confirm: z.literal(true) });
accountRouter.delete('/identity/account', requireJwt, (req, res) => {
  parseOrThrow(delSchema, req.body || {});
  res.status(204).send();
});
