const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  // ���δ�Ʈ ����Ѱ� ���δ� ��ȸ�ؼ� �ѷ��ֱ�
  res.send('This is the root page');
});

module.exports = router;
