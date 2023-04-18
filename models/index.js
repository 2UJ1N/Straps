const mongoose = require("mongoose");
const ItemSchema = require("./schemas/item");

exports.Item = mongoose.model("Item", ItemSchema);