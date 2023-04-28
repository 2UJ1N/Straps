const { User } = require('../models/index');
const userModel = require('../models/userModel');

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

      res.status(200).json(createdUser);
    } catch (error) {
      console.error(error);
    }
  },

  // �α���
  async accessUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const getUserToken = {
        async GetUserToken(loginInfo) {
          const { email, password, role } = loginInfo;

          // ���� db�� ����Ʈ���� �Է��� �̸����� �ִ��� ã��
          const user = await this.userModel.findByEmail(email);
          if (!user) {
            throw new Error('�ش� �̸����� ���� ������ �����ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
          }

          // ��й�ȣ ��ġ ���� Ȯ��
          const correctPasswordHash = user.password; // db�� ����Ǿ� �ִ� ��ȣȭ�� ��й�ȣ

          // �Ű������� ���� �߿� (1��°�� ����Ʈ�� ������ ��й�ȣ, 2���� db�� �ֶ� ��ȣȭ�� ��й�ȣ)
          const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

          if (!isPasswordCorrect) {
            throw new Error('��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
          }

          // �α��� ���� -> JWT �� ��ū ����
          const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

          // 2�� ������Ƽ�� jwt ��ū�� ����; loginRequired: jwt.verify �̿��Ͽ� �������� jwt���� Ȯ�ε� �ؾ��ϳ�?
          const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey); // jwt�� sign �Լ�: ��ū ����, �� �� ���� secret key ���
          if (user.role === 1) {
            return { token, admin: 1 };
          }
          return { token };
        },
      };

      // �α��� ��ū ���� �Լ� ����
      const userToken = await getUserToken;

      res.status(201).json(userToken);
    } catch (error) {
      console.error(error);
    }
  },

  // ����� ���� ��ȸ
  async getAllUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const foundUser = await User.findOne({ user_id });

      if (!foundUser) return console.error(error);

      res.status(202).json(foundUser);
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

      res.status(203).json(updatedUser);
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

      res.status(204).json(deletedUser);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userApi;
