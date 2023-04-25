const { User } = require('../models/index');
const { userService } = require('../services/userService');

const Router = require('express');
const userRouter = Router();

// 미들웨어 불러오기
const contentType = require('../middlewares/contentType');
const validEmailCheck = require('../middlewares/validEmailCheck');
const loginRequired = require('../middlewares/loginRequired');
const authAdmin = require('../middlewares/authAdmin');

// async handler 불러오기
const asyncHandler = require('../utils/asyncHandler');
const isUsingEmail = require('../middlewares/isUsingEmail');

// 회원가입 post
userRouter.post(
  '/register',
  contentType,
  isUsingEmail,
  validEmailCheck,
  asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      // userService의 addUser 함수 적용
      name,
      email,
      password,
      role,
    });

    res.status(201).json(newUser);
  }),
);

// 로그인 post
userRouter.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  }),
);

// 전체 유저 목록을 가져옴 (배열 형태임) // 관리자 페이지
userRouter.get(
  '/admin/userList',
  loginRequired,
  authAdmin,
  asyncHandler(async function (req, res, next) {
    const users = await userService.getUsers();
    res.status(200).json(users);
  }),
);

// 사용자 정보 조회 (자신의 정보를 볼 수 있다.)
userRouter.get(
  '/user',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const userInfo = await userModel.findById({ user_id: userId });
    res.status(200).json(userInfo);
  }),
);

// 사용자 정보 수정
userRouter.patch(
  '/user/edit/:userId',
  contentType,
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const { name, address, phones, currentPassword } = req.body;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword }; // userId 정의: userModel, currentPassword의 정의: ?

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(address && { address }),
      ...(phones && { phones }),
    };

    const updatedUserInfo = await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json(updatedUserInfo);
  }),
);

// 사용자 정보 삭제: 일부 변경하는 개념이므로 patch 메서드로 구현
userRouter.patch(
  '/user/drop',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const { currentPassword } = req.body;
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    const toUpdate = {
      // 의미?
      status: 0,
    };
    const updatedUserInfo = await userService.setUser(userInfoRequired, toUpdate);
    res.status(200).json(updatedUserInfo);
  }),
);

module.exports = userRouter;
