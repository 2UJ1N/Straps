const { User } = require('../models/index');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userApi = {
  // 회원가입: db 에 저장되는 코드 다시 구현  // 오류: user_id path 필요하다
  // async isUsingEmail(email) {
  //   const user = await User.find({ email, status: 1 });
  //   return user.email;
  // },

  async newUser(req, res, next) {
    try {
      const { user_id, password, name, address, phones, email, regdate, role, status } = req.body;

      // 이메일 중복 검사
      const allUser = await User.find({});
      const IsUsingEmail = allUser.map(allUser => allUser.email);
      for (let i = 0; i < IsUsingEmail.length; i++) {
        if (req.body.email == IsUsingEmail[i]) {
          throw new Error('사용 중인 이메일입니다. 다른 이메일을 입력해주세요.');
        }
      }

      const createInfo = {
        user_id,
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
      res.status(401).json({
        // 에러 응답 코드를 401(Unauthorized)으로 설정
        code: 401,
        message: 'email', // 에러 메시지를 클라이언트에게 반환
      });
    }
  },

  // 로그인
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('이메일이 존재하지 않습니다.');
      const passwordMatch = password === user.password;
      if (!passwordMatch) throw new Error('비밀번호가 맞지 않습니다.');
      // console.log(userService.token);

      // // 로그인 성공 -> JWT 웹 토큰 생성
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
        message: 'token',
        token: token,
      });
    } catch (err) {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          // 에러 응답 코드를 401(Unauthorized)으로 설정
          code: 401,
          message: 'email', // 에러 메시지를 클라이언트에게 반환
        });
      }
      const passwordMatch = password === user.password;
      if (!passwordMatch) {
        res.status(402).json({
          code: 402,
          message: 'password', // 에러 메시지를 클라이언트에게 반환
        });
      }
    }
  },

  // 로그인 정보 뽑기
  async parsejwt(req, res, next) {
    // 토큰 파싱하여 저장
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlcl9pZCI6MCwiaWF0IjoxNjgyNzA5ODIzLCJleHAiOjE2ODI3MTA3MjMsImlzcyI6Iu2GoO2BsCDrsJzquInsnpAifQ.ifzE7OY6rmN2L9D-pjz5vwLui52p60ivM_jnFVQpP7A';
    const base64Url = token.split('.')[1];
    const payload = Buffer.from(base64Url, 'base64');
    const result = JSON.parse(payload.toString());
    const ParseUserId = result.user_id;
    const parseUserId = parseInt(ParseUserId);

    // console.log(typeof parseUserId);
    // res.end();

    const user = await User.findOne({ user_id: parseUserId });
    req.currentUser = user;
    next();
    // console.log(parseUserId);
    // res.status(202).json(parseUserId);
  },

  // 사용자 정보 조회: 모든 유저
  async getAllUser(req, res, next) {
    try {
      const foundUser = await User.find({});

      if (!foundUser) return console.error(error);

      res.status(202).json(foundUser);
    } catch (error) {
      console.error(error);
    }
  },

  // 사용자 정보 조회: 특정 유저만
  async getUser(req, res, next) {
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
