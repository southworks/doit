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
        handler: taskController.getAllTasks
    },
    {
        method: 'GET',
        url: '/tasks/:id',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: {type: 'number'},
                        name: {type: 'string'},
                        is_completed: {type: 'boolean'},
                        created_at: {type: 'string'}
                    }
                }
            }
        },
        handler: taskController.getTaskById
    },
    {
        method: 'POST',
        url: '/tasks',
        handler: taskController.createTask
    },
    {
        method: 'DELETE',
        url: '/tasks/:id',
        handler: taskController.deleteTask
    }
]



module.exports = routes;

/*

fastify.route({
    method: 'GET',
    url: '/todo/:id',
    schema: {
      querystring: {

      },
      response: {
        200: {
          type: 'object',
            properties: {
                id: {type: 'number'},
                name: {type: 'string'},
                is_completed: {type: 'boolean'},
                created_at: {type: 'string'}
            }
        }
      }
    },
    handler: (req, res) => {
        console.log(req)
        res.send(
            storeData.filter(task => task.id === req.params.id)
        )
    }
})

*/