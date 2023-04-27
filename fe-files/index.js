//index.html에 사용될 js 스크립트
import {
  putProduct,
  deleteProduct,
  postProduct,
  getProducts,
} from './modules/product.mjs';
import { changeUser, deleteUser, getUser, putUser } from './modules/user.mjs';

//서버 주소
const productsUrl = 'http://34.64.218.104:5002/products';

////////////////////
//getProducts DEMO
const products = getProducts(productsUrl);
// console.log(products);
////////////////////

////////////////////////////////////////////////
// postProduct DEMO
let dataForPostDemo = {
  name: 'PostDemo',
  kind: 1,
  price: 2522,
  content: 'testcontent13',
  image: 'http://dummyimage.com/183x100.png/dddddd/000000',
  regdate: '6/9/2022',
  prod_cell: 3,
};
const callPostProduct = postProduct(productsUrl, dataForPostDemo);
console.log(callPostProduct);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

let dataForPutDemo = {
  name: 'PutDemo',
  kind: 1,
  price: 962,
  content: 'test1010',
  image: 'http://naver.com/183x100.png/5fa2dd/ffffff',
  regdate: '9/23/2025',
  prod_count: 501,
  prod_cell: 91,
  prod_seq: 10,
};

let putUrlParams = 10;

const callPutProduct = putProduct(productsUrl, putUrlParams, dataForPutDemo);
console.log(callPutProduct);
////////////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

let deleteUrlParams = 2;

const callDeleteProduct = deleteProduct(productsUrl, deleteUrlParams);
console.log(callDeleteProduct);
////////////////////////////

//서버 주소
const userUrl = 'http://34.64.218.104:5002/user';

////////////////////////////////////////////////
// postProduct DEMO
let userDataForPostDemo = {
  password: 's58rBMief',
  name: 'Molly Stubbings',
  address: 'Ulsan',
  phones: '010-6742-6856',
  email: 'mstubbings0@google.com',
  regdate: '12/24/2022',
  role: false,
  status: false,
};

const callPutUser = putUser(userUrl, userDataForPostDemo);
console.log(callPutUser);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

let userDataForChangeDemo = {
  password: 'aaaabbbb!!11',
  name: 'Molly Stubbings',
  address: 'Ulsan',
  phones: '010-6742-1234',
  email: 'mstubbings0@google.com',
  regdate: '12/24/2022',
  role: false,
  status: false,
};

const callChangeUser = changeUser(
  userUrl,
  userDataForChangeDemo['email'],
  userDataForChangeDemo
);
console.log(callChangeUser);
////////////////////////////

////////////////////
//getProducts DEMO
const callGetUser = getUser(userUrl, userDataForChangeDemo['email']);
console.log(callGetUser);
////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

let deleteUserEmail = userDataForChangeDemo['email'];

const callDeleteUser = deleteUser(userUrl, deleteUserEmail);
console.log(callDeleteUser);
////////////////////////////

/*
//로컬스토리지 어쩌구저쩌구 중
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', addItemFunction);
});

//addToCartBtns 변수에 할당된 요소..? 여기서부터 막혔죠ㅠㅠㅠㅠㅠㅠㅠㅠㅠ

class CartItem {
  constructor(name, img, price) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

class LocalCart {
  static key = 'cartItems';

  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }
  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }
  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
}

//장바구니 아이콘에 상품수량 표시
const iconShoppingP = document.querySelector('.add-to-cart-btn');
let no = 0;
JSON.parse(localStorage.getItem('item')).map((data) => {
  no = no + data.no;
});
iconShoppingP.innerHTML = no;
*/

//장바구니 로컬스토리지 어쩌구저쩌구 중..
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', addItemFunction);
});

function addItemFunction(e) {
  const id = e.target.closest('.card-item').getAttribute('data-id');
  const name = e.target.closest('.details').querySelector('h3').innerText;
  const img = e.target.closest('.card-item').querySelector('img').src;
  const price = e.target.closest('.details').querySelector('.price').innerText;
  const cartItem = new CartItem(name, img, price);
  LocalCart.addItemToLocalCart(parseInt(id), cartItem);
}

class CartItem {
  constructor(name, img, price) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

class LocalCart {
  static key = 'cartItems';

  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }
  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }
  /*static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(parseInt(id))) {
      let mapItem = cart.get(parseInt(id));
      mapItem.quantity += 1;
      cart.set(parseInt(id), mapItem);
    } else cart.set(parseInt(id), item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Array.from(cart.entries()))
    );
    updateCartUI();
  }
*/
  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
}
