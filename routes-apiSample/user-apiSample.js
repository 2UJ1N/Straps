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
// /user/login
// 로그인 api
router.post('/login', (req, res, next) => {
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
  try {
    // check if the user exists
    const user = mongooseFake.findOne(email);
    if (user) {
      //check if password matches
      const result = password === user.password;
      if (result) {
        let jwt = {
          jwt : "12uaso1jlsadf"
        };
        res.status(200).json(jwt)
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// POST 방식 api
// /user/
// 회원가입 api
router.post('/', (req, res, next) => {
  //요청 바디에서 json 객체 가져옴
  //예시 :
  // req.body =
  // {
  //   "password": "s58rBMief",
  //   "name": "Molly Stubbings",
  //   "address": "Ulsan",
  //   "phones": "010-6742-6856",
  //   "email": "mstubbings0@google.com",
  //   "regdate": "12/24/2022"
  // };
  
  //순서 중요함
  //password, name, address, phones, email, regdate
  const { password, name, address, phones, email, regdate} = req.body;
  const user = mongooseFake.create(password, name, address, phones, email, regdate);
  res.json(user);
});

module.exports = router;