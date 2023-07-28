// Import the mongoose module to connect the app with MongoDB
const mongoose = require('mongoose');

// Create To Do List schema database
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: String,
    status: String
});

// Create To Do List model database
const Todo = mongoose.model('Todo', TodoSchema);

// for import model to app.js
module.exports = Todo;