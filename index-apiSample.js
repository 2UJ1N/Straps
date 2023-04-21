const express = require('express');
//라우터 파일을 productRouter 변수에 저장
const productRouter = require('./routes-apiSample/products-apiSample');

const app = express();

app.use(express.json());

// /routeSample은 url 경로, routeSampeRouter는 라우터
app.use('/products', productRouter);

//아래는 에러 처리
app.use((req, res, next) => {
  res.status(404);
  res.send({ 
    result: 'fail', 
    error: `Page not found ${req.path}`
  });
});

app.use((err, req, res, next) => {
  res.status(500);

  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.listen(3000);