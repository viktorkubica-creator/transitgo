import express from 'express';
import { MockPsp } from '../psp/mocks/MockPsp';

export const paymentsRouter = express.Router();
const psp = new MockPsp();

// POST /v1/payments/intents
// Implements FR-022..FR-024 (TRGO-16)
paymentsRouter.post('/payments/intents', async (req, res) => {
  const { amount, currency } = req.body || {};
  if (!amount || currency !== 'EUR') {
    return res.status(400).json({ error: 'amount and currency=EUR are required' });
  }
  const intent = await psp.createPaymentIntent(Number(amount), 'EUR');
  res.json(intent);
});
