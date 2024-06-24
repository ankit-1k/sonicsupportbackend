// ProjectSchema.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: String,
  projectLink: String,
  description: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
