import request from 'supertest';
import app from '../src/index';

describe('POST /v1/payments/intents', () => {
  it('creates a mock payment intent (FR-022..FR-024, TRGO-16)', async () => {
    const res = await request(app)
      .post('/v1/payments/intents')
      .set('Idempotency-Key', 'key-123')
      .send({ amount: 250, currency: 'EUR' })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('clientSecret');
  });

  it('is idempotent with the same key', async () => {
    const first = await request(app)
      .post('/v1/payments/intents')
      .set('Idempotency-Key', 'same-key')
      .send({ amount: 500, currency: 'EUR' });
    const second = await request(app)
      .post('/v1/payments/intents')
      .set('Idempotency-Key', 'same-key')
      .send({ amount: 500, currency: 'EUR' });
    expect(second.body.id).toBe(first.body.id);
  });
});

describe('3DS simulate & webhook', () => {
  it('simulates 3DS success and verifies webhook', async () => {
    const intent = await request(app)
      .post('/v1/payments/intents')
      .send({ amount: 100, currency: 'EUR' });
    await request(app)
      .post('/v1/payments/3ds/simulate')
      .send({ intentId: intent.body.id })
      .expect(204);
    // webhook signature test
    const body = 'test';
    const crypto = require('crypto') as typeof import('crypto');
    const hmac = crypto.createHmac('sha256', 'training-webhook-secret').update(body).digest('hex');
    await request(app)
      .post('/v1/payments/webhook')
      .set('x-psp-signature', `sha256=${hmac}`)
      .send(body)
      .expect(200);
  });
});
