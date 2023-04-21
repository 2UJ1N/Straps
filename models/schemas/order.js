const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  order_num: { type: Number, required: true, unique: true }, // primary key
  user_id: { type: Schema.Types.ObjectId, ref: "User" }, // reference
  prod_num: { type: Schema.Types.ObjectId, ref: "Product" }, // reference
  order_inDate: { type: String, required: true },
});

module.exports = OrderSchema;
