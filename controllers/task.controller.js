const boom = require('boom');
const model = require('../model/task.model');

const getAllTasks = async (req, res) => {
  let result = await model.getAllTasks();
  console.log(result);
  return result; //res.response(result).type('application/json'); <-- pendiente
};

module.exports = { getAllTasks };
