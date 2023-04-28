const { Router } = require('express');
const router = Router();

const userApi = require('../apis/user_api');

router.post('/register', userApi.newUser); // ȸ������
router.post('/login', userApi.accessUser); // �α���
router.get('/:user_id', userApi.getAllUser); // ����� ���� ��ȸ
router.put('/update/:user_id', userApi.updateUser); // ����� ���� ����
router.delete('/delete/:user_id', userApi.deleteUser); // ����� ���� ����

module.exports = router;
