const dbHandler = require('./db-handler');
const createTasks = require('./seed');
const model = require("../model/task.model");
const repository = require("../repository/task.repository");

const taskId = '999999999999999999999999';
const nonExistentTaskId = '888888888888888888888888';

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

describe("Complete a TODO task testing - Success", () => {
  afterAll(() => {
    fastify.close();
  });

  test('SEND a Complete TODO and check for COMPLETED attribute as TRUE', async (done) => {
    
    var task = await model.findById({ _id: taskId });
    var parsedTask = JSON.parse(JSON.stringify(task));    
    expect(parsedTask.is_completed).toBe(false);

    const response = await dbHandler.fs.inject({
      method: 'PUT',
      url: '/tasks/' + taskId
    });

    task = await model.findById({ _id: taskId });
    parsedTask = JSON.parse(JSON.stringify(task));        

    expect(parsedTask.is_completed).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe("{\"completed\":\"999999999999999999999999 - Task Completed\"}");

    done();
  });
});
  

describe("Complete a TODO Endpoint testing - FAILS", () => {
  afterAll(() => {
    fastify.close();
  });

  test('SEND a Complete TODO with no ID. Code 400', async (done) => {
    
    const response = await dbHandler.fs.inject({
      method: 'PUT',
      url: '/tasks/'
    });
 
    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"errorId\":\"Invalid ID\"}");

    done();
  });

  test('SEND a Complete TODO with non-existent ID. Code 400', async (done) => {
    
    const response = await dbHandler.fs.inject({
      method: 'PUT',
      url: '/tasks/' + nonExistentTaskId
    });
 
    expect(response.statusCode).toBe(400);
    expect(response.payload).toBe("{\"errorId\":\"Invalid ID\"}");

    const task = await model.findById({ _id: nonExistentTaskId });
    expect(task).toBe(null); 

    done();
  });

  test('Delete a TASK and SEND a Complete TODO with such task. Code 405', async (done) => {
    
    let response = await dbHandler.fs.inject({
      method: 'DELETE',
      url: '/tasks/'+ taskId
    });
    
    let task = await model.findById({ _id: taskId });
    const parsedTask = JSON.parse(JSON.stringify(task));    
    expect(parsedTask.deleted).toBe(true);
        
    response = await dbHandler.fs.inject({
      method: 'PUT',
      url: '/tasks/' + taskId
    });    

    expect(response.statusCode).toBe(405);
    expect(response.payload).toBe("{\"taskDeleted\":\"999999999999999999999999 - Already deleted\"}");    

    done();
  });
});