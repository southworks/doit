const storeData = require('../store/local_store');
const boom = require('boom')
const Task = require('../model/task')
const getAllTasks = (req, res) =>{
    try {
        const tasks =  Task.find()
        return tasks
      } catch (err) {
        throw boom.boomify(err)
      }
}

const getTaskById = (req, res) => {
    try {
        const id = req.params.id
        const task =  Task.findById(id)
        return task
      } catch (err) {
        throw boom.boomify(err)
      }
}

const createTask = (req, res) =>{
    try {
        const task = new Task(req.body);
        console.log(task)
        return task.save()
      } catch (err) {
        throw boom.boomify(err)
      }
}

const deleteTask = (req, res) =>{
    try {
        const id = req.params.id
        const task = Task.findByIdAndRemove(id)
        return task
      } catch (err) {
        throw boom.boomify(err)
      }
}



module.exports = {getAllTasks, getTaskById, createTask, deleteTask};