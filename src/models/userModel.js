const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./schemas/user');

const User = mongoose.model('users', UserSchema);

const userModel = {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  },
};

module.exports = userModel;
