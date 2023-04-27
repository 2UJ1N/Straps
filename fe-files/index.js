//index.html에 사용될 js 스크립트
// import { putProduct, deleteProduct, postProduct ,getProducts } from './modules/product.mjs';
import { changeUser, deleteUser, getUser, putUser } from './modules/user.mjs';

//서버 주소
// const productsUrl = "http://34.64.218.104:5002/products";

////////////////////
//getProducts DEMO
// const products = getProducts(productsUrl);
// console.log(products);
////////////////////

////////////////////////////////////////////////
// postProduct DEMO
// let dataForPostDemo =   {
//     "name": "PostDemo",
//     "kind": 1,
//     "price": 2522,
//     "content": "testcontent13",
//     "image": "http://dummyimage.com/183x100.png/dddddd/000000",
//     "regdate": "6/9/2022",
//     "prod_cell": 3
//   };
// const callPostProduct = postProduct(productsUrl,dataForPostDemo);
// console.log(callPostProduct);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

// let dataForPutDemo = {
//   "name": "PutDemo",
//   "kind": 1,
//   "price": 962,
//   "content": "test1010",
//   "image": "http://naver.com/183x100.png/5fa2dd/ffffff",
//   "regdate": "9/23/2025",
//   "prod_count": 501,
//   "prod_cell": 91,
//   "prod_seq": 10
// };

// let putUrlParams = 10;

// const callPutProduct = putProduct(productsUrl, putUrlParams ,dataForPutDemo);
// console.log(callPutProduct);
////////////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

// let deleteUrlParams = 2;

// const callDeleteProduct = deleteProduct(productsUrl, deleteUrlParams);
// console.log(callDeleteProduct);
////////////////////////////
