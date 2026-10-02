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
