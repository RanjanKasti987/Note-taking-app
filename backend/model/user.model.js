const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  githubId: { type: String, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
