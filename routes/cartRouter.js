const { Router } = require("express");
const router = Router();
const cartApi = require("../apis/cart_api");

router.get("/", cartApi.getAllOrder); // (메인 페이지)
router.delete("/:order_num", cartApi.deleteOrder); // (메인 페이지)

module.exports = router;
