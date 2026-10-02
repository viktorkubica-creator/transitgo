import request from 'supertest';
import app from '../src/index';

describe('GET /v1/journeys', () => {
  it('returns options for valid query (FR-001..FR-003, TRGO-20)', async () => {
    const res = await request(app)
      .get('/v1/journeys')
      .query({ origin: 'Main Station', destination: 'Tech District', arriveBy: 'false' })
      .expect(200);
    expect(Array.isArray(res.body.options)).toBe(true);
    expect(res.body.options[0]).toHaveProperty('durationMinutes');
  });

  it('validates required params', async () => {
    const res = await request(app)
      .get('/v1/journeys')
      .query({ origin: '', destination: '' })
      .expect(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});

describe('GET /v1/places/autocomplete', () => {
  it('autocompletes stops', async () => {
    const res = await request(app)
      .get('/v1/places/autocomplete')
      .query({ q: 'main' })
      .expect(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });
});
