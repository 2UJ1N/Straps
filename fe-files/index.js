//index.html에 사용될 js 스크립트
import { getProducts } from './modules/getProducts.mjs';
import { postProduct } from './modules/postProducts.mjs';

const products = getProducts();
console.log(products);


let data =   {
    "name": "text9999",
    "kind": 1,
    "price": 2522,
    "content": "testcontent13",
    "image": "http://dummyimage.com/183x100.png/dddddd/000000",
    "regdate": "6/9/2022",
    "prod_cell": 3
  }
const test1 = postProduct(data);
console.log(test1);