const { Schema } = require("mongoose");

const CartSchema = new Schema({
  cart_num: { type: Number, required: true, unique: true }, // primary key
  user_id: { type: Number, ref: "User" }, // reference
  prod_num: { type: Number, ref: "Product" }, // reference
  cart_quantity: { type: Number, required: true },
  cart_inDate: { type: String, required: true },
});

module.exports = CartSchema;
