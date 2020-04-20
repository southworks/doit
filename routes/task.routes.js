const taskController = require("../controllers/task.controller");

/*
    List all the TODOs and with pagination => GET "/all"
    Get a TODO by Id                       => GET "/tasks/:id"
    Logical delete a TODO by id            => DELETE "/tasks/:id"
    Save a TODO                            => POST "/newtodo/"
    Complete a TODO                        => POST "/tasks/:id"
*/

const routes = [
  {
    method: "GET",
    url: "/tasks",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              is_completed: { type: "boolean" },
            },
          },
        },
      },
    },
    handler: taskController.getAllTasks,
  },
  {
    method: "POST",
    url: "/tasks",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          is_completed: { type: "boolean" },
        },
        required: ["name"],
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            is_completed: { type: "boolean" },
          },
        },
      },
    },
    handler: taskController.save,
  },
  {
    method: "DELETE",
    url: "/tasks/:id",
    params: {
        id: { type: 'string' }
    },
    handler: taskController.deleteTaskById,
  },
  {
    method: "GET",
    url: "/tasks/:id",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            is_completed: { type: "boolean" },
            created_at: { type: "string" },
          },
        },
      },
    },
    handler: taskController.getTaskById,
  },  
  {
    method: "POST",
    url: "/tasks/:id",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            is_completed: { type: "boolean" },
          },
        },
      },
    },
    handler: taskController.completeTodoById,
  },

];

module.exports = routes;
