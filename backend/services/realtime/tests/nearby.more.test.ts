import request from 'supertest';
import app from '../src/index';

describe('Realtime extra cases', () => {
  it('nearby requires lat/lng', async () => {
    await request(app).get('/v1/nearby').expect(400);
  });
  it('nearby returns items', async () => {
    const r = await request(app).get('/v1/nearby?lat=48.145&lng=17.107').expect(200);
    expect(r.body.items.length).toBeGreaterThan(0);
  });
  it('departures sort by soonest', async () => {
    const r = await request(app).get('/v1/departures/STOP123').expect(200);
    const arr = r.body.departures;
    expect(arr[0].expectedInMinutes <= arr[arr.length - 1].expectedInMinutes).toBe(true);
  });
  it('alerts POST validates', async () => {
    await request(app).post('/v1/alerts').send({ line: '4' }).expect(400);
  });
  it('health endpoints work', async () => {
    await request(app).get('/healthz').expect(200);
    await request(app).get('/readyz').expect(200);
  });
  it('departures returns array', async () => {
    const r = await request(app).get('/v1/departures/STOP123').expect(200);
    expect(Array.isArray(r.body.departures)).toBe(true);
  });
});
