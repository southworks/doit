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
});