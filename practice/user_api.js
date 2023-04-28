const { User } = require('../models/index');
const { auth } = require('./authMiddleware');

const jwt = require('jsonwebtoken');

const userApi = {
  // �α��� ��ū ����
  async loginUser(req, res, next) {
    try {
      const getUserToken = {
        async GetUserToken(loginInfo) {
          const { email, password } = loginInfo;

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
          const token = jwt.sign(
            {
              type: 'JWT',
              user_id: user.user_id,
              email: user.email,
            },
            secretKey,
            {
              expiresIn: '15m', // ����ð� 15��
              issuer: '��ū �߱���',
            },
          ); // jwt�� sign �Լ�: ��ū ����, �� �� ���� secret key ���
          //   if (user.role === 1) {
          //     return { token, admin: 1 };
          //   }
          return { token };
        },
      };

      // �α��� ��ū ���� �Լ� ����
      const userToken = await getUserToken;

      res.status(400).json({
        code: 400,
        message: '��ū�� �߱޵Ǿ����ϴ�.',
        token: userToken,
      });
    } catch (error) {
      console.error(error);
    }
  },

  // �α��� ��ū ����
  async verifyToken(req, res, next) {
    const User_id = req.decoded.user_id;
    const Email = req.decoded.email;
    return res.status(500).json({
      code: 500,
      message: '��ū�� �����Դϴ�.',
      data: {
        user_id: User_id,
        email: Email,
      },
    });
  },
};

module.exports = userApi;
