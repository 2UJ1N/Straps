const { Router } = require('express');
const router = Router();

const userApi = require('../apis/user_api');

router.post('/register', userApi.newUser); // 회원가입
router.post('/login', userApi.accessUser); // 로그인
router.get('/:user_id', userApi.getAllUser); // 사용자 정보 조회
router.put('/update/:user_id', userApi.updateUser); // 사용자 정보 수정
router.delete('/delete/:user_id', userApi.deleteUser); // 사용자 정보 삭제

module.exports = router;
