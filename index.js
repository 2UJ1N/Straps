const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// models
const { Product } = require('./models');
const { Cart } = require('./models');
const { Order } = require('./models');
const { User } = require('./models');

// fake json
const FakeProduct = require('./models/Fake/f_products.json');
const FakeCart = require('./models/Fake/f_cart.json');
const FakeOrder = require('./models/Fake/f_order.json');
const FakeUser = require('./models/Fake/f_user.json');

// Middleware
const cors = require('cors');

// Router
const indexRouter = require('./routes/index');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');

// DB ����
mongoose
  .connect(process.env.DB_Link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10��
    socketTimeoutMS: 45000, // 45��
    family: 4, // IPv4
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

// DB �ʱ�ȭ�ϴ� �ڵ� �ֱ�

// Product.deleteMany({});
// Cart.deleteMany({});
// Order.deleteMany({});
// User.deleteMany({});

// DB ����

// Product.create(FakeProduct)
//   .then((products) => {}) //console.log(products)
//   .catch((err) => console.log(err));

// Cart.create(FakeCart)
//   .then((cart) => {}) //console.log(cart)
//   .catch((err) => console.log(err));

// Order.create(FakeOrder)
//   .then((order) => {}) //console.log(order)
//   .catch((err) => console.log(err));

// User.create(FakeUser)
//   .then((user) => {}) //console.log(user)
//   .catch((err) => console.log(err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.use('/products', cors(), productRouter);
app.use('/cart', cors(), cartRouter);
app.use('/order', cors(), orderRouter);
app.use('/user', cors(), userRouter);

app.listen(3000);
