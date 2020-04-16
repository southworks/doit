const boom = require("boom");
const model = require("../model/task.model");
const task = require("../schema/task.schema");

const getAllTasks = async (req, res) => {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  res = await model.getAllTasks(page, limit);
  return res;
};

const save = (req, res) => {
  try {
    const task = new task({
      name: req.body.name,
      is_completed: req.body.is_completed
    });

    task.save();

    res.send({
      id: task._id,
      name: task.name,
      is_completed: task.is_completed
    });
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = { getAllTasks, save };
