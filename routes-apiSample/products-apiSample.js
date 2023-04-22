// 라우터 import
const { Router } = require('express');

// fakeDB 호출 실제에서는 const mongoose = require('mongoose'); 써야함
const mongooseFake = require('../models-apiSample/f_productDB-apiSample');

//라우터 생성
const router = Router();

//get 방식 api
// /products/ 주소 처리
router.get('/', (req, res, next) => {
  const products = mongooseFake.list();
  res.json(products);
});

// GET 방식 api
// /products/:prod_num 주소 처리
router.get('/:prod_num', (req, res, next) => {
  //파라메터에서 prod_num 값을 가져옴
  //예시 :
  // www.example.com/products/1
  // prod_num = 1
  const prod_num = Number(req.params.prod_num);

  try {
    const product = mongooseFake.get(prod_num);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

// POST 방식 api
// /products/ 주소 처리
router.post('/', (req, res, next) => {
  //요청 바디에서 json 객체 가져옴
  //예시 :
  // req.body =
  // {
  //   "name": "text13",
  //   "kind": 1,
  //   "price": 2522,
  //   "content": "testcontent13",
  //   "image": "http://dummyimage.com/183x100.png/dddddd/000000",
  //   "regdate": "6/9/2022",
  //   "prod_cell": 3
  // }

  //순서 중요함
  //name, kind, price, content,image,regdate,prod_count,prod_cell
  const { name, kind, price, content,image,regdate,prod_count,prod_cell } = req.body;
  const product = mongooseFake.create(name, kind, price, content,image,regdate,prod_count,prod_cell);
  res.json(product);
});


// put 방식 api
// /products/:prod_num 주소 처리
router.put('/:prod_num', (req, res, next) => {
  //파라메터에서 prod_num 값을 가져옴
  //예시 :
  // www.example.com/products/10
  // prod_num = 10

  //요청 바디에서 json 객체 가져옴
  //예시 :
  // req.body =
  // {
  //   "name": "test10",
  //   "kind": 1,
  //   "price": 962,
  //   "content": "test1010",
  //   "image": "http://naver.com/183x100.png/5fa2dd/ffffff",
  //   "regdate": "9/23/2025",
  //   "prod_count": 501,
  //   "prod_cell": 91,
  //   "prod_seq": 10
  // }
  const prod_num = Number(req.params.prod_num);
  const { name, kind, price, content,image,regdate,prod_count,prod_cell,prod_seq} = req.body;

  try {
    const product = 
      mongooseFake.update(prod_num, prod_seq, name, kind, price, content,image,regdate,prod_count,prod_cell);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

// put 방식 api
// /products/:prod_num 주소 처리
router.delete('/:prod_num', (req, res, next) => {
  //파라메터에서 prod_num 값을 가져옴
  //예시 :
  // www.example.com/products/10
  // prod_num = 10
  const prod_num = Number(req.params.prod_num);

  try {
    mongooseFake.delete(prod_num);
    res.json({ result: 'success' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;