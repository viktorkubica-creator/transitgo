import request from 'supertest';
import app from '../src/index';

describe('Journeys extra cases', () => {
  it('returns 400 when missing params', async () => {
    await request(app).get('/v1/journeys').expect(400);
  });
  it('supports arriveBy=true', async () => {
    const r = await request(app).get('/v1/journeys?origin=Main Station&destination=Tech District&arriveBy=true').expect(200);
    expect(r.body.options[0].durationMinutes).toBeGreaterThan(0);
  });
  it('autocomplete requires query', async () => {
    await request(app).get('/v1/places/autocomplete').expect(400);
  });
  it('lists favourites', async () => {
    await request(app).post('/v1/favourites').send({ type: 'line', value: 'L-1' }).expect(201);
    const r = await request(app).get('/v1/favourites').expect(200);
    expect(r.body.items.length).toBeGreaterThan(0);
  });
  it('health endpoints work', async () => {
    await request(app).get('/healthz').expect(200);
    await request(app).get('/readyz').expect(200);
  });
  it('rejects walk too far when maxWalkMeters is small', async () => {
    await request(app).get('/v1/journeys?origin=Main Station&destination=Tech District&maxWalkMeters=10').expect(400);
  });
});
