const { Schema } = require("mongoose");

const ItemSchema = new Schema({
  title: { type: String, required: true },
  image: {},
  content: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  count: {},
});

module.exports = ItemSchema;