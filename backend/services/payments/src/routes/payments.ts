import express from 'express';
import { MockPsp } from '../psp/mocks/MockPsp';
import { IntentService } from '../services/intents';

export const paymentsRouter = express.Router();
const psp = new MockPsp();
const intents = new IntentService(psp);

// POST /v1/payments/intents
// Implements FR-022..FR-024 (TRGO-16)
paymentsRouter.post('/payments/intents', async (req, res) => {
  const { amount, currency } = req.body || {};
  const idempotencyKey = (req.headers['idempotency-key'] as string | undefined) || undefined;
  if (!amount || currency !== 'EUR') {
    return res.status(400).json({ error: 'amount and currency=EUR are required' });
  }
  const intent = await intents.create(Number(amount), 'EUR', idempotencyKey);
  res.json(intent);
});

// POST /v1/payments/3ds/simulate – move intent to succeeded
paymentsRouter.post('/payments/3ds/simulate', (req, res) => {
  const { intentId } = req.body || {};
  if (!intentId) return res.status(400).json({ error: 'intentId is required' });
  try {
    intents.transitionToSucceeded(String(intentId));
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'not_found' });
  }
});

// POST /v1/payments/webhook – mock PSP webhook with HMAC signature
paymentsRouter.post('/payments/webhook', express.text({ type: '*/*' }), (req, res) => {
  const sig = req.headers['x-psp-signature'] as string | undefined;
  const ok = intents.verifyWebhook(sig, req.body || '');
  if (!ok) return res.status(400).json({ error: 'invalid_signature' });
  res.status(200).send('ok');
});
