const boom = require("boom");
const model = require("../model/task.model");
const Task = require("../schema/task.schema");

const getAllTasks = async (req, res) => {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(await model.getAllTasks(page, limit));
};

const save = (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      is_completed: req.body.is_completed,
    });

    task.save();

    res.send({
      id: task._id,
      name: task.name,
      is_completed: task.is_completed,
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id
  let result = await model.deleteTaskById(id);
  if (result === false) {
    return res
      .code(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: "invalid id" });
  }
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ deleted_id: id });
};

const getTaskById = async (req, res) => {
  const result = await model.getTaskById(req.params.id);
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(result);
};

module.exports = { getAllTasks, deleteTaskById, save, getTaskById };
