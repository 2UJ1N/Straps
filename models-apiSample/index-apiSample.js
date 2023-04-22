const mongoose = require("mongoose");

// 스키마 가져와서 ProductSchema에 할당
const ProductSchema = require("./schemas-apiSample/product-apiSample");

exports.Product = mongoose.model("Product", ProductSchema);
