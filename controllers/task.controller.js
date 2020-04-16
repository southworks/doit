const boom = require('boom');
const model = require('../model/task.model');

const getAllTasks = async (req, res) => {
  res = await model.getAllTasks(req);
  return(res);
};


module.exports = { getAllTasks, getTaskById };
