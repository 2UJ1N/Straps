const { User } = require('../models/index');

const userApi = {
  // 회원가입: db 에 저장되는 코드 다시 구현  // 오류: user_id path 필요하다
  async newUser(req, res, next) {
    try {
      const { password, name, address, phones, email, regdate, role, status } = req.body;

      const createInfo = {
        password,
        name,
        address,
        phones,
        email,
        regdate,
        role,
        status,
      };

      const createdUser = await User.create(createInfo);

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
    }
  },

  // 로그인

  // 사용자 정보 조회
  async getAllUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const foundUser = await User.findOne({ user_id });

      if (!foundUser) return console.error(error);

      res.status(200).json(foundUser);
    } catch (error) {
      console.error(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const { password, name, address, phones, email, regdate, role, status } = req.body;

      const updateInfo = {
        password,
        name,
        address,
        phones,
        email,
        regdate,
        role,
        status,
      };
      const foundUser = await User.findOne({ user_id });

      if (!foundUser) return console.error(error);

      const updatedUser = await User.updateOne({ user_id }, updateInfo);

      res.status(201).json(updatedUser);
    } catch (error) {
      console.error(error);
    }
  },

  // 사용자 정보 삭제
  async deleteUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const foundPUser = await User.findOne({ user_id });

      if (!foundPUser) return console.error(error);

      const deletedUser = await User.deleteOne({ user_id });

      res.status(201).json(deletedUser);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userApi;
