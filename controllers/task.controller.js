const storeData = require('../store/local_store');

const getAllTasks = (req, res) =>{
    res.send("getTaskById");
}

const getTaskById = (req, res) => {
    console.log("getTaskById" + req);
}

const createTask = (req, res) =>{
    console.log("createTask" + req);
}

const deleteTask = (req, res) =>{
    console.log("deleteTask" + req);
}

module.exports = {getAllTasks, getTaskById, createTask, deleteTask};