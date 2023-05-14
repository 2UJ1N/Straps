const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userApi = {
  // ȸ������
  async newUser(req, res, next) {
    try {
      const { user_id, password, name, address, phones, email, regdate, role, status } = req.body;

      // �̸��� �ߺ� �˻�
      const allUser = await User.find({});
      const IsUsingEmail = allUser.map(allUser => allUser.email);
      for (let i = 0; i < IsUsingEmail.length; i++) {
        if (req.body.email == IsUsingEmail[i]) {
          throw new Error('��� ���� �̸����Դϴ�. �ٸ� �̸����� �Է����ּ���.');
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createInfo = {
        user_id,
        password: hashedPassword,
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
      res.status(421).json({
        // ���� ���� �ڵ带 401(Unauthorized)���� ����
        code: 421,
        message: 'email', // ���� �޽����� Ŭ���̾�Ʈ���� ��ȯ
      });
    }
  },

  // �α���
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      // �̸��� ���� ���� Ȯ��
      const user = await User.findOne({ email });
      if (!user) throw new Error('�̸����� �������� �ʽ��ϴ�.');
      // ��й�ȣ ��ġ ���� Ȯ��
      const correctPasswordHash = user.password;
      const passwordMatch = await bcrypt.compare(password, correctPasswordHash);
      // const passwordMatch = password === user.password;
      if (!passwordMatch) throw new Error('��й�ȣ�� ���� �ʽ��ϴ�.');

      // �α��� ���� -> JWT �� ��ū ����
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

      //2�� ������Ƽ�� jwt ��ū�� ����; loginRequired: jwt.verify �̿��Ͽ� �������� jwt���� Ȯ�ε� �ؾ��ϳ�?
      const token = jwt.sign(
        {
          type: 'JWT',
          user_id: user.user_id,
          test: 'test',
        },
        secretKey,
        {
          expiresIn: '15m', // ����ð� 15��
          issuer: 'hyeri',
        },
      );

      res.status(200).json({
        code: 200,
        message: 'token',
        token: token,
      });

      // const check = jwt.verify(token, 'secretKey');
      // if (check) {
      //   console.log('����', check.test);
      // }
    } catch (err) {
      // ���� ����
      const user = await User.findOne({ email });
      if (!user) {
        res.status(422).json({
          // ���� ���� �ڵ带 401(Unauthorized)���� ����
          code: 422,
          message: 'email', // ���� �޽����� Ŭ���̾�Ʈ���� ��ȯ
        });
      }
      // �н����� ����
      const correctPasswordHash = user.password;
      const passwordMatch = await bcrypt.compare(password, correctPasswordHash);
      if (!passwordMatch) {
        res.status(423).json({
          code: 423,
          message: 'password',
        });
      }
      // // ���� ����
      // else {
      //   res.status(424).json({
      //     code: 424,
      //     message: 'not verified',
      //   });
      // }
    }
  },

  // jwt ��ū �Ľ�
  async parsejwt(req, res, next) {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlcl9pZCI6MTIzLCJ0ZXN0IjoidGVzdCIsImlhdCI6MTY4MzMyOTQ1OCwiZXhwIjoxNjgzMzMwMzU4LCJpc3MiOiJoeWVyaSJ9.OdS7hKAQCiqeylolxvNnZGFYeWspDOwNqSIRFVVRjbU';
      const base64Url = token.split('.')[1];
      const payload = Buffer.from(base64Url, 'base64');
      const result = JSON.parse(payload.toString());
      const parseUserId = result.user_id;
      // const parseUserId = Number(ParseUserId);

      const user = await User.findOne({ user_id: parseUserId });
      // user.user_id = Number(user.user_id);
      // res.currentUser = user;
      // console.log(res.currentUser);
      // res.end();

      res.status(200).json({
        parseUserId,
        email: user.email,
        password: user.password,
      });
      next();
    } catch (error) {
      res.status(424).json({
        code: 424,
        message: 'wrong parsing code',
      });
    }
  },

  // ����� ���� ��ȸ: ��� ����
  async getAllUser(req, res, next) {
    try {
      const foundUser = await User.find({});

      if (!foundUser) return console.error(error);

      res.status(200).json(foundUser);
    } catch (error) {
      res.status(425).json({
        code: 425,
        message: 'not all user',
      });
    }
  },

  // ����� ���� ��ȸ: Ư�� ������
  async getUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const foundUser = await User.findOne({ user_id });

      if (!foundUser) return console.error(error);

      res.status(200).json(foundUser);
    } catch (error) {
      res.status(426).json({
        code: 426,
        message: 'user_id',
      });
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

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(425).json({
        code: 425,
        message: 'wrong update info',
      });
    }
  },

  // ����� ���� ����
  async deleteUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const foundPUser = await User.findOne({ user_id });

      if (!foundPUser) return console.error(error);

      const deletedUser = await User.deleteOne({ user_id });

      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(426).json({
        code: 426,
        message: 'cannot delete user',
      });
    }
  },
};

module.exports = userApi;
