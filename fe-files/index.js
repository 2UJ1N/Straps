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
console.log('안녕하세요');
////////////////////
//getProducts DEMO
const products = getProducts(productsUrl);
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

// let deleteUrlParams = 2;

// const callDeleteProduct = deleteProduct(productsUrl, deleteUrlParams);
// console.log(callDeleteProduct);
////////////////////////////

////////////////////
//getProducts DEMO
//const callGetUser = getUser(userUrl, userDataForChangeDemo['email']);
//console.log(callGetUser);
////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

//let deleteUserEmail = userDataForChangeDemo['email'];

//const callDeleteUser = deleteUser(userUrl, deleteUserEmail);
//console.log(callDeleteUser);
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
/*여기서부터 주석해제 const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
console.log(addToCartBtns);
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
  } 여기까지 1
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
/*다시 주석해제2 static removeItemFromCart(id) {
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
} 주석해제2 끝 */

/*
function saveCartItemToLocalStorage(item) {
  const cartItems = getCartItemsFromLocalStorage();
  cartItems.push(item);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function getCartItemsFromLocalStorage() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

function addToCart(itemImage, itemName, itemPrice, itemQuantity) {
  const cartItem = {
    image: itemImage,
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity,
  };

  saveCartItemToLocalStorage(cartItem);
}

// 장바구니 버튼 이벤트 리스너를 추가하는 함수
function addEventListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target;
      const itemImage = target.getAttribute('data-image');
      const itemName = target.getAttribute('data-name');
      const itemPrice = parseInt(target.getAttribute('data-price'));

      addToCart(itemImage, itemName, itemPrice, 1);
    });
  });
}

// 이벤트 리스너 추가
addEventListeners();

document.addEventListener('DOMContentLoaded', () => {
  // ... 기존 코드 ...

  const cartButton = document.querySelector('#cartSideBar');

  cartButton.addEventListener('show.bs.offcanvas', () => {
    displayCartItems();
  });
});

function displayCartItems() {
  const cartItemsContainer = document.querySelector('.nav-pills');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cartItemsContainer.innerHTML = '';

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
      <a href="#" class="nav-link">
        <div>
          <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
          ${item.name}
          <div class="btn-group">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${item.qty}개
            </button>
            <ul class="dropdown-menu">
              ...
            </ul>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zM5.354 1.146a.5.5 0 1 1 .707.707L5.5 2.207 4.793 1.5l.561-.354zM1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm11 2l.354-.354a.5.5 0 0 1 .706.708L13 4.293l-.353.353z"/>
</svg>
</div>
</a>
</li>`;

    cartItemsContainer.appendChild(li);
  });
}
*/

/*function saveCartItemToLocalStorage(item) {
  const cartItems = getCartItemsFromLocalStorage();
  cartItems.push(item);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function getCartItemsFromLocalStorage() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

function addToCart(itemImage, itemName, itemPrice, itemQuantity) {
  const cartItem = {
    image: itemImage,
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity,
  };

  saveCartItemToLocalStorage(cartItem);
}

function addEventListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target;
      const itemImage = target.getAttribute('data-image');
      const itemName = target.getAttribute('data-name');
      const itemPrice = parseInt(target.getAttribute('data-price'));

      addToCart(itemImage, itemName, itemPrice, 1);
    });
  });
}

addEventListeners();

document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.querySelector('#cartSideBar');

  cartButton.addEventListener('show.bs.offcanvas', () => {
    displayCartItems();
  });
});

function displayCartItems() {
  const cartItemsContainer = document.querySelector('.nav-pills');
  const cartItems = getCartItemsFromLocalStorage();

  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
      <a href="#" class="nav-link">
        <div>
          <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
          ${item.name}
          <div class="btn-group">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${item.qty}개
            </button>
            <ul class="dropdown-menu">
              ...
            </ul>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zM5.354 1.146a.5.5 0 1 1 .707.707L5.5 2.207 4.793 1.5l.561-.354zM1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm11 2l.354-.354a.5.5 0 0 1 .706.708L13 4.293l-.353.353z"/>
</svg>
</div>
</a>
</li>`;

    cartItemsContainer.appendChild(li);
  });
}*/

// CartItem 클래스 정의
class CartItem {
  // 생성자 함수
  constructor(name, desc, img, price) {
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

// LocalCart 클래스 정의 (장바구니 관련 동작 처리)
class LocalCart {
  // localStorage 키 설정
  static key = 'cartItems';

  // 로컬 장바구니의 상품들을 가져옴
  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }

  // 로컬 장바구니에 상품 추가
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

  // 로컬 장바구니에서 상품 삭제
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

// DOM 요소 선택
const cartIcon = document.querySelector('.fa-cart-arrow-down');
const wholeCartWindow = document.querySelector('.whole-cart-window');
wholeCartWindow.inWindow = 0;
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', addItemFunction);
});

// 상품 추가 버튼 동작
function addItemFunction(e) {
  const id =
    e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
  const img = e.target.parentElement.parentElement.previousElementSibling.src;
  const name = e.target.parentElement.previousElementSibling.textContent;
  const desc = e.target.parentElement.children[0].textContent;
  let price = e.target.parentElement.children[0].textContent;
  price = price.replace('₩', '');
  const item = new CartItem(name, desc, img, price);
  LocalCart.addItemToLocalCart(id, item);
  console.log(price);
}

// 장바구니 아이콘에 마우스 오버 이벤트 추가
cartIcon.addEventListener('mouseover', () => {
  if (wholeCartWindow.classList.contains('hide'))
    wholeCartWindow.classList.remove('hide');
});

// 장바구니 아이콘에 마우스 리브 이벤트 추가
cartIcon.addEventListener('mouseleave', () => {
  // if(wholeCartWindow.classList.contains('hide'))
  setTimeout(() => {
    if (wholeCartWindow.inWindow === 0) {
      wholeCartWindow.classList.add('hide');
    }
  }, 500);
});

// 장바구니 창에 마우스 오버 이벤트 추가
wholeCartWindow.addEventListener('mouseover', () => {
  wholeCartWindow.inWindow = 1;
});

wholeCartWindow.addEventListener('mouseleave', () => {
  wholeCartWindow.inWindow = 0;
  wholeCartWindow.classList.add('hide');
});

/*★★클릭이벤트가 좋을까욥?
// 장바구니 아이콘에 클릭 이벤트 추가
cartIcon.addEventListener('click', () => {
  wholeCartWindow.classList.toggle('hide');
});

// 장바구니 창에 클릭 이벤트 추가
wholeCartWindow.addEventListener('click', (event) => {
  // 창 내부에서 클릭 이벤트가 발생했을 때는 창을 닫지 않음
  if (event.target.closest('.whole-cart-window')) return;
  wholeCartWindow.classList.add('hide');
});
*/

// 장바구니 UI 업데이트 함수
function updateCartUI() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  cartWrapper.innerHTML = '';
  const items = LocalCart.getLocalCartItems();
  console.log(items);

  if (items === null) return;
  let count = 0;
  let total = 0;
  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement('div');

    cartItem.classList.add('cart-item');
    console.log(value.price);
    console.log(value.quantity);

    console.log(typeof value.price);
    console.log(typeof value.quantity);

    let price = value.price * value.quantity;
    price = Math.round(price * 100) / 100;
    count += 1;
    total += price;
    total = Math.round(total * 100) / 100;
    cartItem.innerHTML = `
      <img src="${value.img}"> 
                     <div class="details">
                         <h3>${value.name}</h3>
                         <p>${value.desc}
                          <span class="quantity">수량: ${value.quantity}</span>
                             <span class="price">금액: ₩${price}</span>
                         </p>
                     </div>
                     <div class="cancel"><i class="fas fa-window-close"></i></div>
      `;
    // 장바구니에서 상품 삭제 이벤트 추가
    cartItem.lastElementChild.addEventListener('click', () => {
      LocalCart.removeItemFromCart(key);
    });
    cartWrapper.append(cartItem);
  }

  // 장바구니에 상품이 있을 경우 UI 업데이트
  if (count > 0) {
    cartIcon.classList.add('non-empty');
    let root = document.querySelector(':root');
    root.style.setProperty('--after-content', `"${count}"`);
    const subtotal = document.querySelector('.subtotal');
    subtotal.innerHTML = `총 금액: ₩${total}`;
  } else cartIcon.classList.remove('non-empty');
}
// DOMContentLoaded 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
