const boom = require("boom");
const model = require("../model/task.model");

const getAllTasks = async (req, res) => {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  res = await model.getAllTasks(page, limit);
  return res;
};

module.exports = { getAllTasks };
