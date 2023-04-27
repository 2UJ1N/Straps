const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('../models/schemas/user');

const User = mongoose.model('users', UserSchema); // �� �տ� 'users ���� �𸣰���

class UserModel {
  // export class: ES module
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async isUsingEmail(email) {
    // �̸���
    const user = await User.find({ email, status: 1 });
    return user.length === 0;
  }

  async getAuthor(comments) {
    return await User.populate(comments, { path: 'author' });
  }
}

const userModel = new UserModel();

module.exports = userModel;
