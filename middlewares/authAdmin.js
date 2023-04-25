const authAdmin = async (req, res, next) => {
  const role = req.role;

  if (role === 0) {
    res.status(403).json({
      result: 'onlyAdmin',
      reason: '�����ڸ� ������ ������ �������Դϴ�.',
    });
    return;
  }

  next();
};

module.exports = authAdmin;
