import request from 'supertest';
import app from '../src/index';

describe('Saved journeys & favourites', () => {
  it('saves a journey', async () => {
    const res = await request(app)
      .post('/v1/journeys/saved')
      .send({ origin: 'Main Station', destination: 'Old Town' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });

  it('lists saved journeys', async () => {
    const res = await request(app).get('/v1/journeys/saved').expect(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('adds a favourite stop', async () => {
    const res = await request(app)
      .post('/v1/favourites')
      .send({ type: 'stop', value: 'STP-A' })
      .expect(201);
    expect(res.body.type).toBe('stop');
  });

  it('validates bad favourite', async () => {
    await request(app)
      .post('/v1/favourites')
      .send({ type: 'bad', value: '' })
      .expect(400);
  });
});
