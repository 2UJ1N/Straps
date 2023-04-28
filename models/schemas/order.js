const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  order_num: { type: Number, required: true, unique: true }, // primary key
  user_id: { type: String, ref: "User" }, // reference
  prod_num: { type: String, ref: "Product" }, // reference
  order_inDate: { type: String, required: true },
  order_quantity: { type: Number, required: true },
});

module.exports = OrderSchema;
