//product API DEMO
// 데모 구현을 위해 추가된 파일
// index-apiSample.js
// addDataToDB-apiSample.js
// routes-apiSample
//   > products-apiSample.js
// models-apiSample
//   > schemas-apiSample
//   f_productDB-apiSample.js
//   index-apiSample.js
//   > > product-apiSample.js
// index-apiSample.js 구동 시 vscode 디버거 필요함 
// module 에러 남

//express import
const express = require('express');

//cors 미들웨어 import
const cors = require("cors");

// /routes-apiSample/products-apiSample.js product api 라우터
const productRouter = require('./routes-apiSample/products-apiSample');

//express 생성
const app = express();

app.use(express.json());

// /products url
// cor() 미들웨어, cors 핸들링함
// productRouter product api 라우터
app.use('/products',cors(), productRouter);

//404에러처리
app.use((req, res, next) => {
  res.status(404);
  res.send({ 
    result: 'fail', 
    error: `Page not found ${req.path}`
  });
});

//500에러처리
app.use((err, req, res, next) => {
  res.status(500);

  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.listen(3000);