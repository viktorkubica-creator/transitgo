import request from 'supertest';
import app from '../src/index';

describe('Alerts endpoints', () => {
  it('lists alerts', async () => {
    const res = await request(app).get('/v1/alerts').expect(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
  it('creates alert with validation', async () => {
    const body = { line: '4', title: 'Test', description: 'Desc', startsAt: new Date().toISOString() };
    const r = await request(app).post('/v1/alerts').send(body).expect(201);
    expect(r.body.title).toBe('Test');
  });
  it('rejects bad alert', async () => {
    await request(app).post('/v1/alerts').send({}).expect(400);
  });
});
