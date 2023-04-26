const { Router } = require("express");
const router = Router();
const cartApi = require("../apis/cart_api");

router.get("/", cartApi.getAllCart); // (메인 페이지)
router.delete("/:order_num", cartApi.deleteCart); // (메인 페이지)

module.exports = router;
