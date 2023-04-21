const mongoose = require("mongoose");
const ProductSchema = require("./schemas-apiSample/product-apiSample");

exports.Product = mongoose.model("Product", ProductSchema);
