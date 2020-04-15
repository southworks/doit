const boom = require('boom');
const model = require('../model/task.model');

const getAllTasks = async (req, res) => {
  let result = await model.getAllTasks();
  console.log(result);
  return result;//res.response(result).type('application/json'); <-- pendiente
};

// const getAllTasks = (req, res) =>{
//     try {
//         const tasks =  Task.find()
//         return tasks
//       } catch (err) {
//         throw boom.boomify(err)
//       }
// }

const getTaskById = (req, res) => {
  try {
    const id = req.params.id;
    const task = Task.findById(id);
    return task;
  } catch (err) {
    throw boom.boomify(err);
  }
};

const createTask = (req, res) => {
  try {
    const task = new Task(req.body);
    console.log(task);
    return task.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteTask = (req, res) => {
  try {
    const id = req.params.id;
    const task = Task.findByIdAndRemove(id);
    return task;
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, deleteTask };
