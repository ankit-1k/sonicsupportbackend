const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
