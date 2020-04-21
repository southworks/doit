'use strict';

const fastify = require('../app');
const model = require('../model/task.model');

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('request body validation', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks'
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"value\\\" must be of type object\"}');


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
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"name\\\" is required\"}');


    done();
  });

  test('request is_completed validation', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: "Test task",
        is_completed: "Test task"
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"is_completed\\\" must be a boolean\"}');

    done();
  });

  test('success response', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: "Test task"
      }
    });

    var obj = JSON.parse(response.payload);
    expect(response.statusCode).toBe(201);
    expect(obj).toBeInstanceOf(Object);
    expect(obj).toHaveProperty("id");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("is_completed");

    
    done();
  });

  test('success creation without is_completed', async (done) => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: "Test task",
      }
    });

    expect(response.statusCode).toBe(201);

    var obj = JSON.parse(response.payload);
    let idLenght = (obj.id.length>0) ? obj.id.length: 1;
    let testTask = await model.findById(obj.id);
    
    expect(obj.id).toHaveLength(idLenght);
    expect(testTask).toBeInstanceOf(Object);

    expect(testTask.name).toBe(obj.name);
    expect(testTask.is_completed).toBe(obj.is_completed);

    
    
    done();
  });
});

test('success creation with is_completed', async (done) => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/tasks',
    body: {
      name: "Test task",
      is_completed: true
    }
  });

  expect(response.statusCode).toBe(201);

  var obj = JSON.parse(response.payload);
  let testTask = await model.findById(obj.id);

  expect(testTask.is_completed).toBe(obj.is_completed);
  expect(testTask.is_completed).toBe(true);
  
  done();
});