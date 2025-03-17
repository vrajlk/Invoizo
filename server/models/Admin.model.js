const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Customer', AdminSchema);

module.exports = Admin;