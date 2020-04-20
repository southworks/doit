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

const save = (req, res) => {
  let result = repository.save(req.body, (result) => {
    let code = result.code;
    delete result.code;

    return res
      .code(code)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(result);
  });
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
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: "Invalid ID" });
  }
  
  const resultName = await repository.getTaskById(req.params.id);
  const name = resultName.name;
  const isDeleted = resultName.deleted;
  //console.log("\nLa tarea: " + name + " -- Borrada: " + isDeleted);
  if (isDeleted) {
    return res
      .code(409)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ deleted: "Task [" + name + "] is no longer in DB" });
  }
  
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")        
    .send({ completed:  name + " - Completed"});
    //.send({ completed:  id + " - Completed"});
};

module.exports = { getAllTasks, deleteTaskById, save, getTaskById, completeTodoById };
