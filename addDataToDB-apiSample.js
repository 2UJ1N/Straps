const mongoose = require('mongoose');
const { Product } = require('./models');

mongoose.connect("mongodb://127.0.0.1:27017/api-module-test");
//////////////////////////////
// 샘플 테이터 DB에 등록하는 코드
//////////////////////////////
async function addDataToDB() {
  let products = [
    {
      "prod_num": 1,
      "name": "애플워치 D버클 레더 스트랩",
      "kind": 0,
      "price": 9441,
      "content": "봄을 담은 화사한 색감, 슬림한 디자인과 고급진 D버클 스트랩",
      "image": "http://dummyimage.com/199x100.png/ff4444/ffffff",
      "regdate": "4/20/2022",
      "prod_seq": 1,
      "prod_count": 43,
      "prod_cell": 10
    },
    {
      "prod_num": 2,
      "name": "갤럭시워치 슬림 레더 스트랩",
      "kind": 1,
      "price": 7064,
      "content": "슬림한 디자인으로 손목이 얇아보이는 스트랩",
      "image": "http://dummyimage.com/151x100.png/cc0000/ffffff",
      "regdate": "1/5/2023",
      "prod_seq": 2,
      "prod_count": 31,
      "prod_cell": 5
    },
    {
      "prod_num": 3,
      "name": "애플워치 로즈골드 메탈 스트랩",
      "kind": 0,
      "price": 3282,
      "content": "여성 여성한 로즈골드 메탈 스트랩",
      "image": "http://dummyimage.com/110x100.png/dddddd/000000",
      "regdate": "1/17/2023",
      "prod_seq": 3,
      "prod_count": 70,
      "prod_cell": 30
    },
    {
      "prod_num": 4,
      "name": "애플워치 실버 메탈 스트랩",
      "kind": 0,
      "price": 8448,
      "content": "심플 모던한 실버 메탈 스트랩",
      "image": "http://dummyimage.com/241x100.png/ff4444/ffffff",
      "regdate": "10/27/2022",
      "prod_seq": 4,
      "prod_count": 16,
      "prod_cell": 2
    },
    {
      "prod_num": 5,
      "name": "애플워치 블랙 메탈 스트랩",
      "kind": 0,
      "price": 9794,
      "content": "깔끔한 블랙 컬러로 커플템 강추 스트랩",
      "image": "http://dummyimage.com/101x100.png/ff4444/ffffff",
      "regdate": "1/2/2023",
      "prod_seq": 5,
      "prod_count": 23,
      "prod_cell": 40
    },
    {
      "prod_num": 6,
      "name": "갤럭시워치 투명 실리콘 스트랩",
      "kind": 1,
      "price": 1415,
      "content": "여름여름에 찰떡인 투명 실리콘 스트랩",
      "image": "http://dummyimage.com/211x100.png/dddddd/000000",
      "regdate": "9/26/2022",
      "prod_seq": 6,
      "prod_count": 6,
      "prod_cell": 1
    },
    {
      "prod_num": 7,
      "name": "애플워치 라일락 퍼플 실리콘 스트랩",
      "kind": 0,
      "price": 8651,
      "content": "2023년 트렌디 컬러 라일락 퍼플 실리콘 스트랩",
      "image": "http://dummyimage.com/129x100.png/ff4444/ffffff",
      "regdate": "9/18/2022",
      "prod_seq": 7,
      "prod_count": 51,
      "prod_cell": 22
    },
    {
      "prod_num": 8,
      "name": "갤럭시워치 코랄 핑크 가죽 스트랩",
      "kind": 1,
      "price": 2512,
      "content": "여자친구 깜짝 이벤트 선물로 찰떡인 스트랩",
      "image": "http://dummyimage.com/183x100.png/dddddd/000000",
      "regdate": "6/9/2022",
      "prod_seq": 8,
      "prod_count": 15,
      "prod_cell": 3
    },
    {
      "prod_num": 9,
      "name": "갤럭시워치 실버 메탈 스트랩",
      "kind": 1,
      "price": 6355,
      "content": "갤럭시 실버 메탈 스트랩",
      "image": "http://dummyimage.com/201x100.png/5fa2dd/ffffff",
      "regdate": "8/24/2022",
      "prod_seq": 9,
      "prod_count": 89,
      "prod_cell": 13
    },
    {
      "prod_num": 10,
      "name": "애플워치 큐빅 체인 스트랩",
      "kind": 0,
      "price": 9632,
      "content": "큐빅 체인 스트랩",
      "image": "http://dummyimage.com/183x100.png/5fa2dd/ffffff",
      "regdate": "9/23/2022",
      "prod_seq": 10,
      "prod_count": 50,
      "prod_cell": 9
    }
  ];  

  await Product.create(products);
}

addDataToDB()
  .then(() => process.exit());
//////////////////////////////
// 샘플 테이터 DB에 등록하는 코드
//////////////////////////////