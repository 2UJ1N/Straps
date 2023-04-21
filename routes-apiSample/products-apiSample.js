const { Router } = require('express');
const Product = require('../models-apiSample/f_productDB-apiSample');

const router = Router();

router.get('/', (req, res, next) => {
  const products = Product.list();
  res.json(products);
});

router.get('/:prod_num', (req, res, next) => {
  const prod_num = Number(req.params.prod_num);

  try {
    const product = Product.get(prod_num);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post('/', (req, res, next) => {
  const { name, kind, price, content,image,regdate,prod_count,prod_cell } = req.body;
  const product = Product.create(name, kind, price, content,image,regdate,prod_count,prod_cell);
  res.json(product);
});

router.put('/:prod_num', (req, res, next) => {
  const prod_num = Number(req.params.prod_num);
  const { name, kind, price, content,image,regdate,prod_count,prod_cell,prod_seq} = req.body;

  try {
    const product = 
      Product.update(prod_num, prod_seq, name, kind, price, content,image,regdate,prod_count,prod_cell);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.delete('/:prod_num', (req, res, next) => {
  const prod_num = Number(req.params.prod_num);

  try {
    Product.delete(prod_num);
    res.json({ result: 'success' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;