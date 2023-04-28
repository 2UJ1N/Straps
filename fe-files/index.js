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
