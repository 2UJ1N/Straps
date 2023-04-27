const { userModel } = require('../models/userModel');

// ���̺귯�� �ҷ�����
const bcrypt = require('bcrypt'); // ��й�ȣ �ؽ��ϴ� ���̺귯��
const jwt = require('jsonwebtoken'); // �α��� ��ū ���� ���̺귯��

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async isUsingEmail(email) {
    return await this.userModel.isUsingEmail(email);
  }

  // ȸ������
  async addUser(userInfo) {
    const { email, name, password, role } = userInfo;

    const isUsingEmail = await this.isUsingEmail(email);
    const validEmailCheck = await this.validEmailCheck(email);

    // Ż���� ȸ���� �̸����̸� ���� ����
    if (!isUsingEmail) {
      throw new Error('�� �̸����� ���� ������Դϴ�. �ٸ� �̸����� �Է��� �ּ���.');
    }

    if (!validEmailCheck) {
      throw new Error('�������� �̸����� �ƴմϴ�.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ��й�ȣ �ؽ�

    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // �α���: getUserToken ��ū ���� �� ��� �Լ�
  async getUserToken(loginInfo) {
    const { email, password, role } = loginInfo; // ���������� ��������� �����ؾ��ϹǷ� role�� �ʿ�

    // �̸��� ��ġ ���� Ȯ�� (���� db�� ����Ʈ���� �Է��� �̸����� �ִ��� ã�´�)
    const user = await this.userModel.findByEmail(email); // ���̵��� �̸��Ϸ� ���� ã��
    if (!user) {
      throw new Error('�ش� �̸����� ���� ������ �����ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
    }

    // ��й�ȣ ��ġ ���� Ȯ��
    const correctPasswordHash = user.password; // db�� ����Ǿ� �ִ� ��ȣȭ�� ��й�ȣ

    // �Ű������� ���� �߿� (1��°�� ����Ʈ�� ������ ��й�ȣ, 2������ db�� �ֶ� ��ȣȭ�� ��й�ȣ)
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect) {
      throw new Error('��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
    }

    // �α��� ���� -> JWT �� ��ū ����
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // 2�� ������Ƽ�� jwt ��ū�� ����; loginRequired: jwt.verify �̿��Ͽ� �������� jwt���� Ȯ�ε� �ؾ��ϳ�?
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey); // jwt�� sign �Լ�: ��ū ����, �� �� ���� secret key ���
    if (user.role === 1) {
      return { token, admin: 1 }; // ������� ���, ���� ���� �����ڿ� �ٸ��� ��ȯ
    }
    return { token }; // �������� ���, ��ū ���� ����
  }

  // ����� ����� ����.
  async getUsers() {
    const users = await this.userModel.findAll(); /* ���� ���� �� ã�´ٴ� �ǹ�? */
    return users;
  }

  async getUser(id) {
    /* �׳� id ��� �ᵵ ������? */
    return await this.userModel.findById(id);
  }

  // ����� ���� ����, ���� ��й�ȣ�� �־�� ���� ������.
  async setUser(userInfoRequired, toUpdate) {
    // ��ü destructuring: ����ȭ�� �迭 �Ǵ� ��ü�� ����ȭ�Ͽ� �������� ������ �Ҵ�
    const { userId, currentPassword } = userInfoRequired;

    // �켱 �ش� id�� ������ db�� �ִ��� Ȯ��
    let user = await this.userModel.findById(userId);

    // db���� ã�� ���� ���, ���� �޽��� ��ȯ
    if (!user) {
      throw new Error('���� ������ �����ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
    }

    // ����, ���� ������ ���� ����ڰ� �Է��� ��й�ȣ�� �ùٸ� ������ Ȯ���ؾ� ��

    // ��й�ȣ ��ġ ���� Ȯ��
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(currentPassword, correctPasswordHash); // ������ ������ ���� �α����� ���� ����

    if (!isPasswordCorrect) {
      throw new Error('���� ��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
    }

    // ��й�ȣ�� �����ϴ� ��쿡��, ȸ������ ��ó�� �ؽ�ȭ ���־�� ��.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // ������Ʈ ����
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }
}

const userService = new UserService(userModel);

module.exports = userService;
