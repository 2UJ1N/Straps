// 라우터 import
const { Router } = require('express');

// fakeDB 호출 실제에서는 const mongoose = require('mongoose'); 써야함
const mongooseFake = require('../models-apiSample/f_userDB-apiSample');

//라우터 생성
const router = Router();

//GET 방식 api
//무엇을 가져오는 걸까..
router.get('/', (req, res, next) => {
  const users = mongooseFake.list();
  res.json(users);
});

// POST 방식 api
// /user 
// 로그인 api
router.post('/', (req, res, next) => {
  //요청 바디에서 json 객체 가져옴
  //예시 :
  // req.body =
  // {
  //   "email": "mstubbings0@google.com",
  //   "password": "s58rBMief",
  // };
  
  //순서 중요함
  //email, password
  const { email, password } = req.body;
  const jwt = mongooseFake.create(email, password);
  res.json(jwt);
});

// POST 방식 api
// /user/:user_id 
// 회원가입 api
router.post('/:user_id', (req, res, next) => {
  //요청 바디에서 json 객체 가져옴
  //예시 :
  // req.body =
  // {
  //   "user_id": 250,
  //   "password": "s58rBMief",
  //   "name": "Molly Stubbings",
  //   "address": "Ulsan",
  //   "phones": "010-6742-6856",
  //   "email": "mstubbings0@google.com",
  //   "regdate": "12/24/2022",
  //   "role": false,
  //   "status": false
  // };
  
  //순서 중요함
  //user_id, password, name, address, phones, email, regdate, role, status
  const { user_id, password, name, address, phones, email, regdate, role, status} = req.body;
  const user = mongooseFake.create(user_id, password, name, address, phones, email, regdate, role, status);
  res.json(user);
});

module.exports = router;