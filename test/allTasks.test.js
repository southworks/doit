'use strict';

const dbHandler = require('./db-handler');
const createTasks = require('./seed');
const taskModel = require('../model/task.model');
const repository = require('../repository/task.repository');

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

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('GET to /tasks without parameters should retrieve the default value (3)', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'GET',
      url: '/tasks',
      query: {
        page: '',
        limit: '',
      },
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.items).toHaveLength(3);
    done();
  });

  test('GET to /tasks w/parameters should retrieve the requested limit (6)', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'GET',
      url: '/tasks',
      query: {
        page: '0',
        limit: '6',
      },
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.items).toHaveLength(6);
    done();
  });

  test('GET to /tasks w/limit higher than the total of tasks should retrieve the total of tasks', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'GET',
      url: '/tasks',
      query: {
        page: '0',
        limit: '1000',
      },
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.items).toHaveLength(payload.count);
    done();
  });

  test('GET to /tasks w/parameters should be retrieve same items as using repository function', async (done) => {
    const page = 0;
    const limit = 5;

    const response = await dbHandler.fs.inject({
      method: 'GET',
      url: '/tasks',
      query: {
        page: `${page}`,
        limit: `${limit}`,
      },
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.items).toHaveLength(5);

    const repositoryResponse = JSON.parse(await repository.getAllTasks(page, limit));

    expect(repositoryResponse.items).toHaveLength(5);
    expect(repositoryResponse.items).toStrictEqual(payload.items);

    done();
  });

  test("GET to /tasks without any parameter should retrieve the total of tasks", async (done) => {
    const response = await dbHandler.fs.inject({
      method: "GET",
      url: "/tasks",
    });

    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.items).toHaveLength(payload.count);
    done();
  });
});
