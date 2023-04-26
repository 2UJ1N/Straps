const { Cart } = require("../models/index");

const cartApi = {
  // 장바구니 목록 - 장바구니 전체 상품 조회
  async getAllCart(req, res, next) {
    try {
      const foundAllCart = await Cart.find({});
      res.status(200).json(foundAllCart);
    } catch (error) {
      console.error(error);
    }
  },
  // 장바구니 삭제
  async deleteCart(req, res, next) {
    try {
      const { cart_num } = req.params;
      const foundPCart = await Product.findOne({ cart_num });

      if (!foundPCart) return console.error(error);

      const deletedCart = await Cart.deleteOne({ cart_num });

      res.status(201).json(deletedCart);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = cartApi;
