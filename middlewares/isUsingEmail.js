// ȸ������ ��, �̸��� �ߺ����� ��ȿ�� �˻�

import { userService } from './services/userService.js';

const isUsingEmail = async (req, res, next) => {
  const email = req.body.email;

  const isUsingEmail = await userService.isUsingEmail(email);
  // Ż���� ȸ���� �̸����̸� ���� ����
  if (!isUsingEmail) {
    res.status(403).json({
      result: 'isUsingEmail',
      reason: '�� �̸����� ���� ������Դϴ�. �ٸ� �̸����� �Է��� �ּ���.',
    });
    return;
  }
  next();
};

export { isUsingEmail };
