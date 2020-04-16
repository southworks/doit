'use strict';

const fastify = require('../app');

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('', async (done) => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/tasks',
    });

    expect(response.statusCode).toBe(200);
    done();
  });
});