const request = require('supertest');
const app = require('../src/app');
const pg = require('../src/config/postgres');
const { getClient } = require('../src/config/redis');

describe('GET /api/resource', () => {
  it('responds with JSON structure', async () => {
    const res = await request(app).get('/api/resource').timeout({ deadline: 5000 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('message');
  });
});

afterAll(async () => {
  try {
    if (pg && pg.pool) await pg.pool.end();
  } catch (e) {
    // ignore
  }
  try {
    const { client } = getClient();
    if (client && client.quit) await client.quit();
  } catch (e) {
    // ignore
  }
});
