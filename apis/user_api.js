const { User } = require('../models/index');

const userApi = {
  // ȸ������: db �� ����Ǵ� �ڵ� �ٽ� ����  // ����: user_id path �ʿ��ϴ�
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

  // �α���

  // ����� ���� ��ȸ
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

  // ����� ���� ����
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

  // ����� ���� ����
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
