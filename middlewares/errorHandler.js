// ���� �̵����� �׻� (���� �� ������)
// error~next�� 4�� ���ڸ� ������ �־�� ��.
function errorHandler(error, req, res, next) {
  // �͹̳ο� ��������� ��µ�.
  // console.log('\x1b[33m%s\x1b[0m', error.stack);
  console.log(error);
  // ������ 400 �ڵ��� JSON ���·� ����Ʈ�� ���޵�
  // res.status(400).json({ result: 'error', reason: error.message });
}

module.exports = errorHandler;
