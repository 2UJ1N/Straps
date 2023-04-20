const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  prodnum: { type: Number, required: true, unique: true }, // primary key
  name: { type: String, required: true },
  kind: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  regdate: { type: Date, default: Date.now },
  product_seq: { type: Number, required: true },
});

module.exports = ProductSchema;
