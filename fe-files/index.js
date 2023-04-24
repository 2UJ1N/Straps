//index.html에 사용될 js 스크립트
import { getProducts } from './modules/getProducts.mjs';

const products = getProducts();
console.log(products);