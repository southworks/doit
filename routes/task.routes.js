const taskController = require('../controllers/task.controller');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const { error_schema, objectsList_schema, object_schema, resOK_schema,
  createdOK_schema, deletedOK_schema } = require('../schemas/task.schemas');


const routes = [
  {
    method: 'GET',
    url: '/tasks',
    schema: {
      query: {
        page: {type: 'string'},
        limit: {type: 'string'},
      },
      response: {
        200: objectsList_schema.swagger,
        400: error_schema.swagger
      }
    },
    handler: taskController.getAllTasks
  },
  {
    method: 'POST',
    url: '/tasks',
    schema: {
      body: {
        type: 'object',
        properties:{
          name: {type: 'string'},
          is_completed: {type: 'boolean'}
        }
      },
      response:{
        200: createdOK_schema.swagger,
        400: error_schema.swagger
      }
    },
    handler: taskController.save
  },
  {
    method: 'DELETE',
    url: '/tasks/:id',
    schema: {
      params: {
        id: Joi.objectId().required(),
      },
      response:{
        200: deletedOK_schema.swagger
      }
    },
    handler: taskController.deleteTaskById
  },
  {
    method: 'GET',
    url: '/tasks/:id',
    schema: {
      params: {
        id: Joi.objectId().required(),
      },
      response: {
        200: object_schema.swagger,
        400: error_schema.swagger
      }
    },
    handler: taskController.getTaskById
  },
  {
    method: 'PUT',
    url: '/tasks/:id',
    schema: {
      params: {
        id: Joi.objectId().required(),
      },
/*      
        response: {
          200: resOK_schema.swagger,
          400: error_schema.swagger,
          405: error_schema.swagger,
          500: error_schema.swagger,
      },
*/      
    },
    handler: taskController.completeTodoById
  }
];

module.exports = routes;
