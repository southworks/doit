const Model = require('../model/task.model');
const boom = require('boom');

const mapTask = task => ({
  id: task._id,
  name: task.name,
  is_completed: task.is_completed
});

const getAllTasks = async (page, limit) => {
  if (page === 0) {
    page = 0;
  }
  if (limit === 0) {
    limit = 3;
  }

  try {
    let totalItems = await Model.countDocuments();
    let items = await Model
      .find()
      .limit(limit)
      .skip(limit * page);

    return JSON.stringify({ items: items, count: totalItems });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteTaskById = async id => {
  return Model
    .findById(id)
    .then(task => {
      if (task === null) {
        return {
          message: 'An error occurred, check the ID or try again later',
          code: 400
        };
      }
      return Model
        .updateOne(
          { _id: id },
          {
            deleted: true
          }
        )
        .then(() => ({
          message: 'TODO deleted!',
          id: id,
          code: 200
        }));
    })
    .catch(err => {
      throw boom.boomify(err);
    });
};

const getTaskById = async taskId => {
  try {
    return Model.findById(taskId);
  } catch (error) {
    throw boom.boomify(error);
  }
};

const completeTodoById = async id => {
  try {
    //Bring the record to check if task is deleted
    let task = await Model.findById(id);
    let parsedTask = JSON.parse(JSON.stringify(task));

    //check existence of the record if not return 400
    if (parsedTask === null) {
      return 400;
    }

    //check "deleted" field in order to update or not
    if (parsedTask.deleted === true) {
      return 405;
    }

    //let taskName = parsedTask.name;

    //update the record
    task = await Model.updateOne(
      { _id: id, deleted: false },
      {
        is_completed: true
      }
    );
    parsedTask = JSON.parse(JSON.stringify(task));

    //check if it was updateded
    if (parsedTask.nModified === 0) {
      return 500;
    }

    //succefull operation
    return 200;
  } catch (err) {
    return 400;
  }
};

const create = async data => {
  return new Model({
    name: data.name,
    is_completed: data.is_completed || false
  })
    .save()
    .then(task => {
      return {
        success: 'TODO created!',
        code: 201,
        data: mapTask(task)
      };
    })
    .catch(err => {
      throw boom.boomify(err);
    });
};

const update = async data => {
  const id = data.id;
  return Model
    .updateOne(
      { _id: id },
      {
        name: data.name,
        is_completed: data.is_completed || false
      }
    )
    .then(() =>
      Model.findById(id).then(task => ({
        success: 'TODO updated!',
        code: 200,
        data: mapTask(task)
      }))
    )
    .catch(err => {
      throw boom.boomify(err);
    });
};

const save = async data => {
  const taskExists = await Model.findById(data.id);
  if (taskExists !== null) {
    return update(data);
  } else {
    return create(data);
  }
};

module.exports = { getAllTasks, deleteTaskById, getTaskById, completeTodoById, save };
