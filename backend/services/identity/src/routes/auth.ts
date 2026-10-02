import express from 'express';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();
const SECRET = 'training-secret-not-for-production';

// POST /v1/identity/login
// Implements FR-020 (TRGO-14)
authRouter.post('/identity/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  const token = jwt.sign({ sub: email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});
