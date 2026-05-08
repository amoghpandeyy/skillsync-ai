const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  interests: [{ type: String }],
  taskStats: { type: Map, of: Number, default: {} }
});

module.exports = mongoose.model('User', userSchema);
