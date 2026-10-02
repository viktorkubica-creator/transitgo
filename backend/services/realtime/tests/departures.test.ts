import request from 'supertest';
import app from '../src/index';

describe('GET /v1/departures/:stopId', () => {
  it('returns a departure board (FR-007, TRGO-18)', async () => {
    const res = await request(app).get('/v1/departures/STOP123').expect(200);
    expect(res.body.stopId).toBe('STOP123');
    expect(Array.isArray(res.body.departures)).toBe(true);
  });
});
