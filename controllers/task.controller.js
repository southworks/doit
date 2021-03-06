const repository = require('../repository/task.repository');

const getAllTasks = async (req, res) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  return res
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(await repository.getAllTasks(page, limit));
};

const save = async (req, res) => {
  const result = await repository.save(req.body);

  if (result.success) {
    return res.code(result.code).send(result.data);
  } else {
    res.send('Error: unable to save TODO').code(400);
  }
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;

  let result = await repository.deleteTaskById(id);

  if (result.message) {
    return res.code(result.code).send({
      message: result.message,
      id: result.id
    });
  } else {
    return res.code(400).send('An error occurred, try again later');
  }
};

const getTaskById = async (req, res) => {
  const result = await repository.getTaskById(req.params.id);
  if (!result) {
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
  const id = req.params.id;
  let result = await repository.completeTodoById(id);

  if (result === 200) {
    return res
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ completed: id + ' - Task Completed' });
  }

  if (result === 400) {
    return res
      .code(400)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ errorId: 'Invalid ID' });
  }

  if (result === 405) {
    return res
      .code(405)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ taskDeleted:  id + ' - Already deleted'});
  }

  if (result === 500) {
    return res
      .code(500)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ errorCatch:  'serverError'});
  }

};

module.exports = { getAllTasks, deleteTaskById, save, getTaskById, completeTodoById };
