import request from 'supertest';
import app from '../src/index';

describe('POST /v1/identity/login', () => {
  it('returns a token for valid credentials (FR-020, TRGO-14)', async () => {
    const res = await request(app)
      .post('/v1/identity/login')
      .send({ email: 'user@example.com', password: 'password' })
      .expect(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('Account endpoints', () => {
  it('refreshes token and deletes account', async () => {
    const login = await request(app).post('/v1/identity/login').send({ email: 'x@y', password: 'z' });
    const token = login.body.token;
    const refresh = await request(app).post('/v1/identity/token/refresh').set('Authorization', `Bearer ${token}`).expect(200);
    expect(refresh.body.token).toBeTruthy();
    await request(app).delete('/v1/identity/account').set('Authorization', `Bearer ${token}`).send({ confirm: true }).expect(204);
  });
});
describe('GET /v1/identity/profile', () => {
  it('requires auth and returns profile with consents', async () => {
    const login = await request(app)
      .post('/v1/identity/login')
      .send({ email: 'p@ex.com', password: 'x' });
    const token = login.body.token;
    const prof = await request(app)
      .get('/v1/identity/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(prof.body.sub).toBe('p@ex.com');
  });
});
