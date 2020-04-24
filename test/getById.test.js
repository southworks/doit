"use strict";

const dbHandler = require('./db-handler');
const createTasks = require('./seed');
const model = require("../model/task.model");
const repository = require("../repository/task.repository");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.startFastify();
    await dbHandler.connectDatabase();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
    await createTasks();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
    dbHandler.closeFastify();
});

describe("server test", () => {
  afterAll(() => {
    fastify.close();
  });

  test("GET to /tasks/:id to retrieve task data", async (done) => {
    let newTask = await new model({
      name : "New unit test",
    }).save();

    const task_id = newTask._id

    const response = await dbHandler.fs.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });

    let obj = JSON.parse(response.payload)

    const doesTaskExist = await model.exists({ _id: task_id });
    expect(doesTaskExist).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(obj._id).toBe(newTask.id);
    done();
  });

  test("GET to /tasks/:id to retrieve task data with no existing id", async (done) => {
    let newTask = await new model({
      name : "New unit test",
    });
    const task_id = newTask._id

    const response = await dbHandler.fs.inject({
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
    const response = await dbHandler.fs.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });
    expect(response.payload).toBe( "{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"id\\\" with value \\\"dasdn!dk.,.\\\" fails to match the valid mongo id pattern\"}");
    expect(response.statusCode).toBe(400);
    done();
  });

  test('special characters Get by empy id', async (done) => {
    const task_id = ''
    const response = await dbHandler.fs.inject({
      method: "GET",
      url: `/tasks/${task_id}`,
    });
    expect(response.payload).toBe( "{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"id\\\" is not allowed to be empty\"}");
    expect(response.statusCode).toBe(400);
    done();
  });

});