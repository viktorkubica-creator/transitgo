import request from 'supertest';
import app from '../src/index';

describe('GET /v1/journeys', () => {
  it('returns options for valid query (FR-001..FR-003, TRGO-20)', async () => {
    const res = await request(app)
      .get('/v1/journeys')
      .query({ origin: 'Home', destination: 'Work' })
      .expect(200);
    expect(Array.isArray(res.body.options)).toBe(true);
    expect(res.body.options[0]).toHaveProperty('durationMinutes');
  });
});
