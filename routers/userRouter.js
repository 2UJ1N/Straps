const { User } = require('../models/index');
const { userService } = require('../services/userService');

const Router = require('express');
const userRouter = Router();

// �̵���� �ҷ�����
const contentType = require('../middlewares/contentType');
const validEmailCheck = require('../middlewares/validEmailCheck');
const loginRequired = require('../middlewares/loginRequired');
const authAdmin = require('../middlewares/authAdmin');

// async handler �ҷ�����
const asyncHandler = require('../utils/asyncHandler');
const isUsingEmail = require('../middlewares/isUsingEmail');

// ȸ������ post
userRouter.post(
  '/register',
  contentType,
  isUsingEmail,
  validEmailCheck,
  asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // �� �����͸� ���� db�� �߰��ϱ�
    const newUser = await userService.addUser({
      // userService�� addUser �Լ� ����
      name,
      email,
      password,
      role,
    });

    res.status(201).json(newUser);
  }),
);

// �α��� post
userRouter.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // �α��� ���� (�α��� ���� �� jwt ��ū�� ����Ʈ�� ���� ��)
    const userToken = await userService.getUserToken({ email, password });

    // jwt ��ū�� ����Ʈ�� ���� (jwt ��ū��, ���ڿ���)
    res.status(200).json(userToken);
  }),
);

// ��ü ���� ����� ������ (�迭 ������) // ������ ������
userRouter.get(
  '/admin/userList',
  loginRequired,
  authAdmin,
  asyncHandler(async function (req, res, next) {
    const users = await userService.getUsers();
    res.status(200).json(users);
  }),
);

// ����� ���� ��ȸ (�ڽ��� ������ �� �� �ִ�.)
userRouter.get(
  '/user',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const userInfo = await userModel.findById({ user_id: userId });
    res.status(200).json(userInfo);
  }),
);

// ����� ���� ����
userRouter.patch(
  '/user/edit/:userId',
  contentType,
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const { name, address, phones, currentPassword } = req.body;

    // currentPassword ���� ��, ���� �Ұ�
    if (!currentPassword) {
      throw new Error('������ �����Ϸ���, ������ ��й�ȣ�� �ʿ��մϴ�.');
    }

    const userInfoRequired = { userId, currentPassword }; // userId ����: userModel, currentPassword�� ����: ?

    // �� �����Ͱ� undefined�� �ƴ϶��, ��, ����Ʈ���� ������Ʈ�� ����
    // �����־��ٸ�, ������Ʈ�� ��ü�� ������.
    const toUpdate = {
      ...(name && { name }),
      ...(address && { address }),
      ...(phones && { phones }),
    };

    const updatedUserInfo = await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json(updatedUserInfo);
  }),
);

// ����� ���� ����: �Ϻ� �����ϴ� �����̹Ƿ� patch �޼���� ����
userRouter.patch(
  '/user/drop',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const { currentPassword } = req.body;
    if (!currentPassword) {
      throw new Error('������ �����Ϸ���, ������ ��й�ȣ�� �ʿ��մϴ�.');
    }

    const userInfoRequired = { userId, currentPassword };

    const toUpdate = {
      // �ǹ�?
      status: 0,
    };
    const updatedUserInfo = await userService.setUser(userInfoRequired, toUpdate);
    res.status(200).json(updatedUserInfo);
  }),
);

module.exports = userRouter;
