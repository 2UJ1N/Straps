const Router = require('express');
const router = Router();

const userApi = require('./user_api');
const { auth } = require('./authMiddleware');

// �α��� �����
router.post('/login', userApi.loginUser);
router.get('/payload', auth, userApi.verifyToken);

module.exports = router;
