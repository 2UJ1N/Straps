const { User } = require('../models/index');
const userModel = require('../models/userModel');

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
  async accessUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const getUserToken = {
        async GetUserToken(loginInfo) {
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
          const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey); // jwt의 sign 함수: 토큰 생성, 이 때 위의 secret key 사용
          if (user.role === 1) {
            return { token, admin: 1 };
          }
          return { token };
        },
      };

      // 로그인 토큰 생성 함수 연결
      const userToken = await getUserToken;

      res.status(201).json(userToken);
    } catch (error) {
      console.error(error);
    }
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
