const { User } = require('../models/index');
const userService = require('../services/userService');

// 회원가입

const userApi = {
  // const newUser = await userService.addUser({
  //   // userService의 addUser 함수 적용
  //   name,
  //   email,
  //   password,
  //   role,
  // });

  // res.status(201).json(newUser);
  async register(req, res, next) {
    try {
      const newUser = await User.find({});
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userApi;
