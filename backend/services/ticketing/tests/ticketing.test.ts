import request from 'supertest';
import app from '../src/index';

describe('Ticketing', () => {
  it('creates and lists tickets, activates and generates QR', async () => {
    const t = await request(app).post('/v1/tickets').send({ productId: 'single', userId: 'u1' }).expect(201);
    const list = await request(app).get('/v1/tickets?userId=u1').expect(200);
    expect(list.body.items.length).toBeGreaterThan(0);
    await request(app).post('/v1/tickets/activate').send({ id: t.body.id }).expect(204);
    const qr = await request(app).get(`/v1/tickets/${t.body.id}/qr`).expect(200);
    expect(qr.body.token).toBeTruthy();
    const ok = await request(app).post('/v1/tickets/validate').send({ token: qr.body.token }).expect(200);
    expect(ok.body.ok).toBe(true);
  });
});
