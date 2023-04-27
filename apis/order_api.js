const { Order } = require("../models/index");

const orderApi = {
  // 주문 목록 - 주문 전체 상품 조회
  async getAllOrder(req, res, next) {
    try {
      const foundAllOrder = await Order.find({});
      res.status(200).json(foundAllOrder);
    } catch (error) {
      console.error(error);
    }
  },
  // 주문 목록 삭제
  async deleteOrder(req, res, next) {
    try {
      const { order_num } = req.params;
      const foundPOrder = await Product.findOne({ order_num });

      if (!foundPOrder) return console.error(error);

      const deletedOrder = await Cart.deleteOne({ cart_num });

      res.status(201).json(deletedOrder);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = orderApi;
