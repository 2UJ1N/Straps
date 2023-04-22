const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  prod_num: {
    type: Number,
    requried: true,
  },
  name: {
    type: String,
    required: true,
  },
  kind: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  regdate: {
    type: String,
    required: true,
  },
  prod_seq: {
    type: Number,
    required: true,
  },
  prod_count: {
    type: Number,
    required: true,
  },
  prod_cell: {
    type: Number,
    required: true
  }
});

module.exports = ProductSchema;
