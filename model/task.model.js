// External Dependancies
const taskSchema = require('../schema/task.schema');
const boom = require('boom');

const getAllTasks = async () => {
  try {
    return taskSchema.find();
  } catch (error) {
    throw boom.boomify(err);
  }
};

module.exports = { getAllTasks };
