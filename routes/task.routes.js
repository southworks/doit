const taskController = require('../controllers/task.controller');
const Joi = require('@hapi/joi');

const routes = [
  {
    method: 'GET',
    url: '/tasks',
    schema: {
      query: {
        page: {type: 'number'},
        limit: {type: 'number'},
      },
      response: {
        200: {
          description:'OK',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              is_completed: { type: 'boolean' },
              deleted: { type: 'boolean' },
              created_at: { type: 'string' }
            }
          }
        },
        400: {
          description: 'Error',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    },
    handler: taskController.getAllTasks
  },
  {
    method: 'POST',
    url: '/tasks',
    schema: {
      body: Joi.object({
        id: Joi.string(),
        name: Joi.string()
          .min(2)
          .required(),
        is_completed: Joi.bool()
      })
    },
    schemaCompiler: schema => data => schema.validate(data),
    handler: taskController.save
  },
  {
    method: 'DELETE',
    url: '/tasks/:id',
    schema: {
      description: 'DELETE a todo',
      params: Joi.object({
        id: Joi.string().required()
      })
    },
    schemaCompiler: schema => data => schema.validate(data),
    handler: taskController.deleteTaskById
  },
  {
    method: 'GET',
    url: '/tasks/:id',
    schema: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Task id'
          }
        }
      },
      response: {
        200: {
            description:'OK',
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              is_completed: { type: 'boolean' },
              deleted: { type: 'boolean' },
              created_at: { type: 'string' }
            }
        },
        400: {
          description:'Error',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    },
    handler: taskController.getTaskById
  },
  {
    method: 'PUT',
    url: '/tasks/:id',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            completed: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            errorId: { type: 'string' }
          }
        },
        405: {
          type: 'object',
          properties: {
            taskDeleted: { type: 'string' }
          }
        },
        500: {
          type: 'object',
          properties: {
            errorCatch: { type: 'string' }
          }
        },
      },
    },
    handler: taskController.completeTodoById
  }
];

module.exports = routes;