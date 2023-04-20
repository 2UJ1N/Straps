const mongoose = require("mongoose");

const ProductSchema = require("./schemas/product");
const CartSchema = require("./schemas/cart");
const OrderSchema = require("./schemas/order");

exports.Product = mongoose.model("Product", ProductSchema);
exports.Cart = mongoose.model("Cart", CartSchema);
exports.Order = mongoose.model("Order", OrderSchema);
