'use strict';

const dbHandler = require('./db-handler');
const createTasks = require('./seed');
const model = require('../model/task.model');

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
    dbHandler.fs.close();
  });

  test('request body validation', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks'
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"value\\\" must be of type object\"}');


    done();
  });

  test('request name validation', async (done) => {
    const response = await dbHandler.fs.inject({
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
    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: 'Test task',
        is_completed: 'Test task'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe('{\"statusCode\":400,\"error\":\"Bad Request\",\"message\":\"\\\"is_completed\\\" must be a boolean\"}');

    done();
  });

  test('success response', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: 'Test task'
      }
    });

    let obj = JSON.parse(response.payload);
    expect(response.statusCode).toBe(201);
    expect(obj).toBeInstanceOf(Object);
    expect(obj).toHaveProperty('id');
    expect(obj).toHaveProperty('name');
    expect(obj).toHaveProperty('is_completed');


    done();
  });

  test('success creation without is_completed', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: 'Test task',
      }
    });

    expect(response.statusCode).toBe(201);

    let obj = JSON.parse(response.payload);
    let idLenght = (obj.id.length>0) ? obj.id.length: 1;
    let testTask = await model.findById(obj.id);

    expect(obj.id).toHaveLength(idLenght);
    expect(testTask).toBeInstanceOf(Object);

    expect(testTask.name).toBe(obj.name);
    expect(testTask.is_completed).toBe(obj.is_completed);



    done();
  });


  test('success creation with is_completed', async (done) => {
    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        name: 'Test task',
        is_completed: true
      }
    });

    expect(response.statusCode).toBe(201);

    let obj = JSON.parse(response.payload);
    let testTask = await model.findById(obj.id);

    expect(testTask.is_completed).toBe(obj.is_completed);
    expect(testTask.is_completed).toBe(true);

    done();
  });

  test('succes update name by ID', async (done) => {
    let newTask = await new model({
      name : 'New unit test',
    }).save();

    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        id: newTask._id,
        name: 'New name'
      }
    });

    let obj = JSON.parse(response.payload);
    const doesTaskExist = await model.exists({ _id: newTask._id });
    expect(doesTaskExist).toBe(true);
    let testTask = await model.findById(obj.id);
    expect(testTask.name).toBe(obj.name);
    expect(response.statusCode).toBe(200);

    done();
  });


  test('succes update is_completed by ID', async (done) => {
    let newTask = await new model({
      name : 'New unit test',
      is_completed : true
    }).save();

    const response = await dbHandler.fs.inject({
      method: 'POST',
      url: '/tasks',
      body: {
        id: newTask._id,
        name: newTask.name,
        is_completed: false
      }
    });
    let obj = JSON.parse(response.payload);
    const doesTaskExist = await model.exists({ _id: newTask._id });
    expect(doesTaskExist).toBe(true);
    let testTask = await model.findById(obj.id);
    expect(testTask.is_completed).toBe(false);
    expect(response.statusCode).toBe(200);

    done();
  });


});

