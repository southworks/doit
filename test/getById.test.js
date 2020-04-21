/**
 * @jest-environment node
 */

"use strict";

const fastify = require("../app");
const model = require('../model/task.model');

describe("server test", () => {
  afterAll(() => {
    fastify.close();
  });

  test("GET to /tasks/:id to retrieve task data", async (done) => {
    const task_id = '5e973aaa0daea30fa1fb1407'

    const response = await fastify.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    const payload = JSON.parse(response.payload);

    const doesTaskExist = await model.exists({ _id: task_id });
    expect(doesTaskExist).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(payload._id).toBe(task_id);
    done();
  });

  test("GET to /tasks/:id to retrieve task data", async (done) => {
    const task_id = '5e973aaa0daea30fa1fb1407'

    const response = await fastify.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    const payload = JSON.parse(response.payload);

    const doesTaskExist = await model.exists({ _id: task_id });
    expect(doesTaskExist).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(payload._id).toBe(task_id);
    done();
  });

  test("GET to /tasks/:id to retrieve task data with no existing id", async (done) => {
    const task_id = '5e973aaa0daea30fa1fb1408'

    const response = await fastify.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    const payload = JSON.parse(response.payload);
    const doesTaskExist = await model.exists({ _id: task_id });
    expect(doesTaskExist).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"error\":\"invalid id\"}");
    done();
  });

  test('special characters Get by id', async (done) => {
    const task_id = 'dasdn!dk.,.?@'
    const response = await fastify.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    expect(response.statusCode).toBe(500);
    done();
  });

  test('special characters Get by empy id', async (done) => {
    const task_id = ''
    const response = await fastify.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    expect(response.statusCode).toBe(500);
    done();
  });

});