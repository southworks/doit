// External Dependancies
const taskSchema = require("../schema/task.schema");
const boom = require("boom");

const getAllTasks = async (page, limit) => {
  if (page === 0) page = 0;
  if (limit === 0) limit = 3;

  try {
    var totalItems = (await taskSchema.find()).length;
    var items = await taskSchema
      .find()
      .limit(limit)
      .skip(limit * page);

    return JSON.stringify({ items: items, count: totalItems });
  } catch (error) {
    throw boom.boomify(err);
  }
};

const deleteTaskById = async (id) => {
  try {
    let task = await taskSchema.updateOne(
      { _id: id },
      {
        deleted: true,
      }
    );
    let response = JSON.parse(JSON.stringify(task));

    if (response.n === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getTaskById = async (taskId) => {
  try {
    return taskSchema.findById(taskId);
  } catch (error) {
    throw boom.boomify(error);
  }
};

module.exports = { getAllTasks, deleteTaskById, getTaskById };
