const { userModel } = require('../models/userModel');

// 라이브러리 불러오기
const bcrypt = require('bcrypt'); // 비밀번호 해싱하는 라이브러리
const jwt = require('jsonwebtoken'); // 로그인 토큰 생성 라이브러리

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async isUsingEmail(email) {
    return await this.userModel.isUsingEmail(email);
  }

  // 회원가입
  async addUser(userInfo) {
    const { email, name, password, role } = userInfo;

    const isUsingEmail = await this.isUsingEmail(email);
    const validEmailCheck = await this.validEmailCheck(email);

    // 탈퇴한 회원의 이메일이면 가입 가능
    if (!isUsingEmail) {
      throw new Error('이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
    }

    if (!validEmailCheck) {
      throw new Error('정상적인 이메일이 아닙니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱

    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 로그인: getUserToken 토큰 생성 후 담는 함수
  async getUserToken(loginInfo) {
    const { email, password, role } = loginInfo; // 관리자인지 사용자인지 구분해야하므로 role도 필요

    // 이메일 일치 여부 확인 (유저 db에 프론트에서 입력한 이메일이 있는지 찾는다)
    const user = await this.userModel.findByEmail(email); // 아이디인 이메일로 유저 찾기
    if (!user) {
      throw new Error('해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있떤 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // 2개 프로퍼티를 jwt 토큰에 담음; loginRequired: jwt.verify 이용하여 정상적인 jwt인지 확인도 해야하나?
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey); // jwt의 sign 함수: 토큰 생성, 이 때 위의 secret key 사용
    if (user.role === 1) {
      return { token, admin: 1 }; // 사용자인 경우, 리턴 값을 관리자와 다르게 반환
    }
    return { token }; // 관리자인 경우, 토큰 값만 리턴
  }

  // 사용자 목록을 받음.
  async getUsers() {
    const users = await this.userModel.findAll(); /* 유저 정보 다 찾는다는 의미? */
    return users;
  }

  async getUser(id) {
    /* 그냥 id 라고 써도 괜찮나? */
    return await this.userModel.findById(id);
  }

  // 사용자 정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring: 구조화된 배열 또는 객체를 비구조화하여 개별적인 변수에 할당
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(currentPassword, correctPasswordHash); // 동일한 내용이 위에 로그인할 때도 있음

    if (!isPasswordCorrect) {
      throw new Error('현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }
}

const userService = new UserService(userModel);

module.exports = userService;
