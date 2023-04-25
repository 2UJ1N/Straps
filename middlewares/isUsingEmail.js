// 회원가입 시, 이메일 중복인지 유효성 검사
const userService = require('../services/userService');

const isUsingEmail = async (req, res, next) => {
  const email = req.body.email;

  const isUsingEmail = await userService.isUsingEmail(email);
  // 탈퇴한 회원의 이메일이면 가입 가능
  if (!isUsingEmail) {
    res.status(403).json({
      result: 'isUsingEmail',
      reason: '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.',
    });
    return;
  }
  next();
};

module.exports = isUsingEmail;
