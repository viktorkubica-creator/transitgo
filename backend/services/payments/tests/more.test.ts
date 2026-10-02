import request from 'supertest';
import app from '../src/index';
import crypto from 'crypto';

describe('Payments extra cases', () => {
  it('idempotency returns same intent', async () => {
    const key = 'idem-xyz';
    const a = await request(app).post('/v1/payments/intents').set('Idempotency-Key', key).send({ amount: 100, currency: 'EUR' });
    const b = await request(app).post('/v1/payments/intents').set('Idempotency-Key', key).send({ amount: 100, currency: 'EUR' });
    expect(a.body.id).toBe(b.body.id);
  });
  it('webhook invalid signature rejected', async () => {
    await request(app).post('/v1/payments/webhook').set('x-psp-signature', 'sha256=bad').send('abc').expect(400);
  });
  it('products non-empty', async () => {
    const r = await request(app).get('/v1/products').expect(200);
    expect(r.body.items.length).toBeGreaterThan(0);
  });
  it('orders list after create', async () => {
    await request(app).post('/v1/orders').send({ productId: 'prod_single', amount: 150, currency: 'EUR' }).expect(201);
    const r = await request(app).get('/v1/orders').expect(200);
    expect(r.body.items.length).toBeGreaterThan(0);
  });
  it('refunds requires body', async () => {
    await request(app).post('/v1/refunds').send({}).expect(400);
  });
  it('health endpoints work', async () => {
    await request(app).get('/healthz').expect(200);
    await request(app).get('/readyz').expect(200);
  });
  it('product has priceCents', async () => {
    const r = await request(app).get('/v1/products').expect(200);
    expect(typeof r.body.items[0].priceCents).toBe('number');
  });
});
