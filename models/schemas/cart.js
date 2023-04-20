const { Schema } = require("mongoose");

const CartSchema = new Schema({
  cart_num: { type: Number, required: true, unique: true }, // primary key
  user_id: { type: Number, required: true },
  prod_num: { type: Number, required: true },
  cart_quantity: { type: Number, required: true },
  cart_inDate: { type: String, required: true },
});

module.exports = CartSchema;
