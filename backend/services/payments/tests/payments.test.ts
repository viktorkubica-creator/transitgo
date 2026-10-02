import request from 'supertest';
import app from '../src/index';

describe('POST /v1/payments/intents', () => {
  it('creates a mock payment intent (FR-022..FR-024, TRGO-16)', async () => {
    const res = await request(app)
      .post('/v1/payments/intents')
      .send({ amount: 250, currency: 'EUR' })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('clientSecret');
  });
});
