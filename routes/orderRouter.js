const { Router } = require("express");
const router = Router();
const orderApi = require("../apis/product_api");

router.get("/", orderApi.getAllOrder); // (메인 페이지)
router.delete("/:order_num", orderApi.deleteOrder); // (메인 페이지)

module.exports = router;
