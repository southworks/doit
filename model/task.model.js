const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  is_completed: { type: Boolean, default: 0 },
  created_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: 0 },
});

module.exports = mongoose.model('Task', taskSchema);

