const { User } = require('../models/index');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

      res.status(200).json(createdUser);
    } catch (error) {
      console.error(error);
    }
  },

  // 로그인
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error('이메일이 존재하지 않습니다.');
    const passwordMatch = password === user.password;
    if (!passwordMatch) throw new Error('비밀번호가 맞지 않습니다.');

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    //2개 프로퍼티를 jwt 토큰에 담음; loginRequired: jwt.verify 이용하여 정상적인 jwt인지 확인도 해야하나?
    const token = jwt.sign(
      {
        type: 'JWT',
        user_id: user.user_id,
      },
      secretKey,
      {
        expiresIn: '15m', // 만료시간 15분
        issuer: '토큰 발급자',
      },
    );

    res.status(200).json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token: token,
    });
  },

  // 사용자 정보 조회
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

      res.status(203).json(updatedUser);
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

      res.status(204).json(deletedUser);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userApi;
