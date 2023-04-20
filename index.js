const express = require("express");
const mongoose = require("mongoose");
const app = express();

// models
const { Product } = require("./models");
const { Cart } = require("./models");
const { Order } = require("./models");

// fake json
const FakeProduct = require("./models/Fake/f_products.json");
const FakeCart = require("./models/Fake/f_cart.json");
const FakeOrder = require("./models/Fake/f_order.json");

// DB 연결
mongoose
  .connect(
    "mongodb+srv://admin:elice1234@admin-cluster.dj8naev.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10초
      socketTimeoutMS: 45000, // 45초
      family: 4, // IPv4
    }
  )
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

// DB 저장
Product.create(FakeProduct)
  .then((products) => console.log(products))
  .catch((err) => console.log(err));

Cart.create(FakeCart)
  .then((cart) => console.log(cart))
  .catch((err) => console.log(err));

Order.create(FakeOrder)
  .then((order) => console.log(order))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(8080);
