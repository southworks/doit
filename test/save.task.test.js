'use strict';

const fastify = require('../app');

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('route success response', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: "Test task"
      }
    });

    expect(response.statusCode).toBe(200);
    done();
  });

  test('request body validation', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks'
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"body should be object\"}');


    done();
  });

  test('request name validation', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"body should have required property \'name\'\"}');


    done();
  });

  test('request is validation', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"body should have required property \'name\'\"}');


    done();
  });
});