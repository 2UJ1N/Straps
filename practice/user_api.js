const { User } = require('../models/index');
const { auth } = require('./authMiddleware');

const jwt = require('jsonwebtoken');

const userApi = {
  // 로그인 토큰 생성
  async loginUser(req, res, next) {
    try {
      const getUserToken = {
        async GetUserToken(loginInfo) {
          const { email, password } = loginInfo;

          // 유저 db에 프론트에서 입력한 이메일이 있는지 찾기
          const user = await this.userModel.findByEmail(email);
          if (!user) {
            throw new Error('해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
          }

          // 비밀번호 일치 여부 확인
          const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

          // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번는 db에 있떤 암호화된 비밀번호)
          const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

          if (!isPasswordCorrect) {
            throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
          }

          // 로그인 성공 -> JWT 웹 토큰 생성
          const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

          // 2개 프로퍼티를 jwt 토큰에 담음; loginRequired: jwt.verify 이용하여 정상적인 jwt인지 확인도 해야하나?
          const token = jwt.sign(
            {
              type: 'JWT',
              user_id: user.user_id,
              email: user.email,
            },
            secretKey,
            {
              expiresIn: '15m', // 만료시간 15분
              issuer: '토큰 발급자',
            },
          ); // jwt의 sign 함수: 토큰 생성, 이 때 위의 secret key 사용
          //   if (user.role === 1) {
          //     return { token, admin: 1 };
          //   }
          return { token };
        },
      };

      // 로그인 토큰 생성 함수 연결
      const userToken = await getUserToken;

      res.status(400).json({
        code: 400,
        message: '토큰이 발급되었습니다.',
        token: userToken,
      });
    } catch (error) {
      console.error(error);
    }
  },

  // 로그인 토큰 검증
  async verifyToken(req, res, next) {
    const User_id = req.decoded.user_id;
    const Email = req.decoded.email;
    return res.status(500).json({
      code: 500,
      message: '토큰은 정상입니다.',
      data: {
        user_id: User_id,
        email: Email,
      },
    });
  },
};

module.exports = userApi;
