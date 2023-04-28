// 라이브러리
const bcrypt = require('bcrypt'); // 비밀번호 해싱하는 라이브러리
const jwt = require('jsonwebtoken'); // 로그인 토큰 생성 라이브러리

// 각종 변수 불러오기
const { User } = require('../models/index');
const { userModel } = require('../models/userModel');

// 로그인 토큰 생성
const userService = class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserToken(loginInfo) {
    const { email, password, role } = loginInfo;

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
    const token = jwt.sign({ userId: user_id, role: user.role }, secretKey); // jwt의 sign 함수: 토큰 생성, 이 때 위의 secret key 사용
    // if (user.role === 1) {
    //   return { token, admin: 1 };
    // }
    return { token };
  }
};

module.exports = userService;
