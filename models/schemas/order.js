const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  order_num: { type: Number, required: true, unique: true }, // primary key
  userId: { type: Number, required: true },
  order_inDate: { type: String, required: true },
});

module.exports = OrderSchema;
