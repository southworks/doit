const boom = require('boom');
const repository = require('../repository/task.repository');

const getAllTasks = async (req, res) => {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  return res
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(await repository.getAllTasks(page, limit));
};

const save = async (req, res) => {
  const result = await repository.save(req.body);
  if (result.success) return res.code(result.code).send(result.data);
  else res.response('Unable to save TODO').code(400);
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;
  let result = await repository.deleteTaskById(id);
  if (result === false) {
    return res
      .code(400)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ error: 'invalid id' });
  }
  return res
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ deleted_id: id });
};

const getTaskById = async (req, res) => {
  const result = await repository.getTaskById(req.params.id);
  if(!result){
    return res
    .code(400)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: 'invalid id' });
  }
  return res
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(result);
};

const completeTodoById = async (req, res) => {
  const id = req.params.id
  let result = await repository.completeTodoById(id);
  if (result === false) {
    return res
      .code(400)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ error: 'Invalid ID' });
  }
  
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")        
    .send({ completed:  id + " - Completed"});        
};

module.exports = { getAllTasks, deleteTaskById, save, getTaskById, completeTodoById };
