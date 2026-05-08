const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  originalResponse: { type: String, required: true },
  category: { type: String, default: 'General' },
  difficulty: { type: String, default: 'Beginner' }
});

module.exports = mongoose.model('Task', taskSchema);
