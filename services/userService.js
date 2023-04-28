// ���̺귯��
const bcrypt = require('bcrypt'); // ��й�ȣ �ؽ��ϴ� ���̺귯��
const jwt = require('jsonwebtoken'); // �α��� ��ū ���� ���̺귯��

// ���� ���� �ҷ�����
const { User } = require('../models/index');
const { userModel } = require('../models/userModel');

// �α��� ��ū ����
const userService = class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserToken(loginInfo) {
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
    const token = jwt.sign({ userId: user_id, role: user.role }, secretKey); // jwt�� sign �Լ�: ��ū ����, �� �� ���� secret key ���
    // if (user.role === 1) {
    //   return { token, admin: 1 };
    // }
    return { token };
  }
};

module.exports = userService;
