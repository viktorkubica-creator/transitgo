import request from 'supertest';
import app from '../src/index';

describe('Ticketing extra cases', () => {
  it('validate rejects missing token', async () => {
    await request(app).post('/v1/tickets/validate').send({}).expect(400);
  });
  it('list requires userId', async () => {
    await request(app).get('/v1/tickets').expect(400);
  });
  it('activation of missing ticket returns 404', async () => {
    await request(app).post('/v1/tickets/activate').send({ id: 'missing' }).expect(404);
  });
  it('health endpoints work', async () => {
    await request(app).get('/healthz').expect(200);
    await request(app).get('/readyz').expect(200);
  });
  it('create+qr+validate happy path again', async () => {
    const t = await request(app).post('/v1/tickets').send({ productId: '24h', userId: 'u2' }).expect(201);
    const qr = await request(app).get(`/v1/tickets/${t.body.id}/qr`).expect(200);
    const ok = await request(app).post('/v1/tickets/validate').send({ token: qr.body.token }).expect(200);
    expect(ok.body.ok).toBe(true);
  });
});
