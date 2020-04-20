'use strict';

const fastify = require('../app');
const model = require('../model/task.model');

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('existing id delete', async (done) => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: '/tasks/5e973b72a24e7a0fdfb28626'      
    });
    const doesTaskExist = await model.exists({ _id: "5e973b72a24e7a0fdfb28626" });
    expect(doesTaskExist).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe("{\"deleted_id\":\"5e973b72a24e7a0fdfb28626\"}");
    const deletedTask = await model.findById({ _id: "5e973b72a24e7a0fdfb28626" });
    expect(deletedTask.deleted).toBe(true);
    done();
  });

  test('unexisting id delete', async (done) => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: '/tasks/5e973b72a24e7a0fdfb28627',
    });
    const doesTaskExist = await model.exists({ _id: "5e973b72a24e7a0fdfb28627" });
    expect(doesTaskExist).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"error\":\"invalid id\"}");
    done();
  });

  test('empty id delete', async (done) => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: '/tasks/',
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"error\":\"invalid id\"}");
    done();
  });

  test('special characters id delete', async (done) => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: '/tasks/dasdn!dk.,.?@',
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"error\":\"invalid id\"}");
    done();
  });

});