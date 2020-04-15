const taskController = require('../controllers/task.controller');

/*
    List all the TODOs and with pagination => GET "/all"
    Get a TODO by Id                       => GET "/todo/:id"
    Logical delete a TODO by id            => DELETE "/todo/:id"
    Save a TODO                            => POST "/newtodo/"
    Complete a TODO                        => POST "/todo/:id"
*/

const routes = [
  {
    method: 'GET',
    url: '/tasks',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              is_completed: { type: 'boolean' }
              //falta tipo fecha
            }
          }
        }
      }
    },
    handler: taskController.getAllTasks
  }
];

module.exports = routes;
