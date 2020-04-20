const model = require('../model/task.model');
const boom = require('boom');

const getAllTasks = async (page, limit) => {
  if (page === 0) page = 0;
  if (limit === 0) limit = 3;

  try {
    var totalItems = (await model.find()).length;
    var items = await model
      .find()
      .limit(limit)
      .skip(limit * page);

    return JSON.stringify({ items: items, count: totalItems });
  } catch (error) {
    throw boom.boomify(err);
  }
};

const deleteTaskById = async id => {
  try {
    let task = await model.updateOne(
      { _id: id },
      {
        deleted: true
      }
    );
    let response = JSON.parse(JSON.stringify(task));

    if (response.n === 0) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const getTaskById = async taskId => {
  try {
    return model.findById(taskId);
  } catch (error) {
    throw boom.boomify(error);
  }
};

const completeTodoById = async id => {
  try {
    let task = await taskSchema.updateOne(
      { _id: id },
      {
        is_completed: true
      }
    );
    let response = JSON.parse(JSON.stringify(task));

    if (response.n === 0) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { getAllTasks, deleteTaskById, getTaskById, completeTodoById };
