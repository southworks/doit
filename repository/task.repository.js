const model = require('../model/task.model');
const boom = require('boom');

const getAllTasks = async (page, limit) => {
  if (page === 0) page = 0;
  if (limit === 0) limit = 3;

  try {
    var totalItems = (await model.count());
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
    let task = await model.updateOne(
      { _id: id, deleted: false },
      {
        is_completed: true
      }
    );
    let response = JSON.parse(JSON.stringify(task));

    if (response.nModified === 0) {
      return false;
    }
    return true;

  
  } catch (err) {
    return false;
  }
};

const save = async (data, callback) => {
  model.count({ _id: data.id }, function (err, count) {
    if (count > 0) {
      update(data, callback);
    } else {
      create(data, callback);
    }
  });

};

const create = async (data, callback) => {
  try {
    const task = new model({
      name: data.name,
      is_completed: data.is_completed
    });

    await task.save();

    callback({
      id: task._id,
      name: task.name,
      is_completed: task.is_completed,
      code: 201
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const update = async (data, callback) => {
  try {
    await model.updateOne(
      { _id: data.id },
      {
        name: data.name,
        is_completed: data.is_completed
      }
    );

    let task = await model.findById(data.id);
    callback({
      id: task._id,
      name: task.name,
      is_completed: task.is_completed,
      code: 200
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports = { getAllTasks, deleteTaskById, getTaskById, completeTodoById, save };
