import request from 'supertest';
import app from '../src/index';

describe('Identity extra cases', () => {
  it('returns JWKS', async () => {
    const r = await request(app).get('/v1/identity/.well-known/jwks.json').expect(200);
    expect(Array.isArray(r.body.keys)).toBe(true);
  });
  it('requires auth for profile', async () => {
    await request(app).get('/v1/identity/profile').expect(401);
  });
  it('delete account validates confirm flag', async () => {
    const login = await request(app).post('/v1/identity/login').send({ email: 'a@b', password: 'x' });
    const token = login.body.token;
    await request(app).delete('/v1/identity/account').set('Authorization', `Bearer ${token}`).send({}).expect(400);
  });
  it('refresh requires auth', async () => {
    await request(app).post('/v1/identity/token/refresh').expect(401);
  });
  it('health endpoints work', async () => {
    await request(app).get('/healthz').expect(200);
    await request(app).get('/readyz').expect(200);
  });
  it('login returns token string', async () => {
    const r = await request(app).post('/v1/identity/login').send({ email: 'b@c', password: 'y' }).expect(200);
    expect(typeof r.body.token).toBe('string');
  });
});
