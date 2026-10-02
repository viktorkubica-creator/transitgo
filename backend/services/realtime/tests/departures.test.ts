import request from 'supertest';
import app from '../src/index';

describe('GET /v1/departures/:stopId', () => {
  it('returns a departure board (FR-007, TRGO-18)', async () => {
    const res = await request(app).get('/v1/departures/STOP123').expect(200);
    expect(res.body.stopId).toBe('STOP123');
    expect(Array.isArray(res.body.departures)).toBe(true);
  });
});

describe('GET /v1/nearby', () => {
  it('returns nearby stops list', async () => {
    const res = await request(app).get('/v1/nearby?lat=48.145&lng=17.107&radius=300').expect(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });
});
