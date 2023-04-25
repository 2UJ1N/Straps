const contentType = (req, res, next) => {
  if (is.emptyObject(req.body)) {
    res.status(412).json({
      result: 'Content-Type',
      reason: 'headers�� Content-Type�� application/json���� �������ּ���',
    });
    return;
  }
  next();
};
module.exports = contentType;
