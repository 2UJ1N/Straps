/* �α��� jwt ��ū ����� */

const jwt = require('jsonwebtoken');

function loginRequired(req, res, next) {
  // request ����κ��� authorization bearer ��ū�� ����.
  const userToken = req.headers['authorization']?.split(' ')[1];

  // �� ��ū�� jwt ��ū ���ڿ��̰ų�, Ȥ�� "null" ���ڿ��̰ų�, undefined��.
  // ��ū�� "null" �� ���, login_required �� �ʿ��� ���� ����� ������.
  if (!userToken || userToken === 'null') {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '�α����� ������ ����� �� �ִ� �����Դϴ�.',
    });

    return;
  }

  // jwt�� verify �Լ�: �ش� token �� �������� token���� Ȯ��
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const { userId, role } = jwtDecoded;

    req.currentUserId = userId; // currentUserId ��� ���ǵǴ��� �𸣰���???
    req.role = role;

    next();
  } catch (error) {
    //  ��ū�� ���������� decode �ȵ�.
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '�������� ��ū�� �ƴմϴ�.',
    });

    return;
  }
}

module.exports = loginRequired;
