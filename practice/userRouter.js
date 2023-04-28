const Router = require('express');
const router = Router();

const userApi = require('./user_api');
const { auth } = require('./authMiddleware');

// 로그인 라우터
router.post('/login', userApi.loginUser);
router.get('/payload', auth, userApi.verifyToken);

module.exports = router;
