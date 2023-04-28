const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
exports.auth = (req, res, next) => {
  // ���� �Ϸ�
  try {
    // ��û ����� ����� ��ū(req.headers.authorization)�� ���Ű�� ����Ͽ� ��ū�� req.decoded�� ��ȯ
    req.decoded = jwt.verify(req.headers.authorization, secretKey);
    return next();
  } catch (error) {
    // ���� ����
    // ��ȿ�ð��� �ʰ��� ���
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '��ū�� ����Ǿ����ϴ�.',
      });
    }
    // ��ū�� ���Ű�� ��ġ���� �ʴ� ���
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '��ȿ���� ���� ��ū�Դϴ�.',
      });
    }
  }
};
