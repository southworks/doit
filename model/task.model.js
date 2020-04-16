// External Dependancies
const taskSchema = require('../schema/task.schema');
const boom = require('boom');

const getAllTasks = async (req) => {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);

  if(page===undefined)
    page = 0; //Constantes globales?

  if(limit===undefined)
    limit = 10; //Constantes globales?

  try {
    var totalItems = (await taskSchema.find()).length; 
    var items = await taskSchema.find().limit(limit).skip(limit*page)

    return JSON.stringify({items:items, count: totalItems});
  } catch (error) {
    throw boom.boomify(err);
  }
};

module.exports = { getAllTasks, getTaskById };
