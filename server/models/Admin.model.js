const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminId: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  number: {
    unique: true,
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }


});

// Auto-generate adminId
AdminSchema.pre("save", async function (next) {
  if (!this.adminId) {
    const lastAdmin = await this.constructor.findOne().sort({ adminId: -1 });
    this.adminId = lastAdmin ? lastAdmin.adminId + 1 : 1;
  }
  next();
});

const Admin = mongoose.model('Admins', AdminSchema);

module.exports = Admin;