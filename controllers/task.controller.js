const storeData = require('../store/local_store');

const getAllTasks = (req, res) =>{
    res.send(storeData);
}

const getTaskById = (req, res) => {
    const task = storeData.find(storedTask => storedTask.id === req.params.id);

    res.send(task);
}

const createTask = (req, res) =>{
    console.log("createTask: " + req.body);
    res.send("Task created");
}

const deleteTask = (req, res) =>{
    console.log("deleteTask: " + req.params.id);
    res.send("Task deleted");
}

module.exports = {getAllTasks, getTaskById, createTask, deleteTask};