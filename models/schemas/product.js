const { Schema } = require('mongoose');

const ProductSchema = new Schema(
  {
    prod_num: { type: Number, required: true, unique: true }, // primary key
    name: { type: String, required: true },
    kind: { type: String, required: true },
    price: { type: Number, required: true },
    content: { type: String },
    image: { type: String, required: true },
    regdate: { type: Date, default: Date.now },
    prod_seq: { type: Number, required: true },
    prod_count: { type: Number, required: true },
  },
  { timestamps: true, collection: 'Product' }
);

module.exports = ProductSchema;
