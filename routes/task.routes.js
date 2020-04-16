const taskController = require("../controllers/task.controller");

/*
    List all the TODOs and with pagination => GET "/all"
    Get a TODO by Id                       => GET "/todo/:id"
    Logical delete a TODO by id            => DELETE "/todo/:id"
    Save a TODO                            => POST "/newtodo/"
    Complete a TODO                        => POST "/todo/:id"
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
<<<<<<< HEAD
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
=======
    method: "DELETE",
    url: "/tasks/:id",
    handler: taskController.deleteTaskById,
  },
  {
    method: "GET",
    url: "/tasks/:id",
    schema: {
      response: {
        200: {
>>>>>>> minor fixes
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            is_completed: { type: "boolean" },
<<<<<<< HEAD
=======
            created_at: { type: "string" },
>>>>>>> minor fixes
          },
        },
      },
    },
<<<<<<< HEAD
    handler: taskController.save,
  },
  {
    method: "DELETE",
    url: "/tasks/:id",
    handler: taskController.deleteTaskById,
=======
    handler: taskController.getTaskById,
>>>>>>> minor fixes
  },
];

module.exports = routes;
