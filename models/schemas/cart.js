const { Schema } = require('mongoose');

const CartSchema = new Schema({
  cart_num: { type: Number, required: true, unique: true }, // primary key
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // foreign key
  prod_num: { type: Schema.Types.ObjectId, ref: 'Product' }, // foreign key
  cart_quantity: { type: Number, required: true },
  cart_inDate: { type: String, required: true },
});

module.exports = CartSchema;
