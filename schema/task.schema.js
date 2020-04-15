// External Dependancies
const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
  name: String,
  is_completed: Boolean,
  created_at: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema)