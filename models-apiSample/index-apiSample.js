const mongoose = require("mongoose");

// 스키마 가져와서 ProductSchema에 할당
const ProductSchema = require("./schemas-apiSample/product-apiSample");
const UserSchema = require("./schemas-apiSample/user-apiSample");


exports.Product = mongoose.model("Product", ProductSchema);
exports.User = mongoose.model("User", UserSchema);