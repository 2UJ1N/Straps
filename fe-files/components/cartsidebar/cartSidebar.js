// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName('link'));
      var head = document.getElementsByTagName('head')[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (
          (elem.href && typeof rel != 'string') ||
          rel.length == 0 ||
          rel.toLowerCase() == 'stylesheet'
        ) {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href =
            url +
            (url.indexOf('?') >= 0 ? '&' : '?') +
            '_cacheOverride=' +
            new Date().valueOf();
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address =
      protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (
      sessionStorage &&
      !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')
    ) {
      console.log('Live reload enabled.');
      sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
  })();
} else {
  console.error(
    'Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.'
  );
}
// ]]>

// .trash-icon 클래스를 가진 모든 요소를 찾아서 이벤트 리스너를 추가합니다.
const trashIcons = document.querySelectorAll('.trash-icon');
trashIcons.forEach((trashIcon) => {
  trashIcon.addEventListener('click', function () {
    // 클릭된 요소의 부모 li 태그를 찾아서 삭제합니다.
    const li = this.closest('li');
    li.remove();
  });
});

/*//로컬스토리지 장바구니ㅠㅠ
fetch('products.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    localStorage.setItem('products', JSON.stringify(data));
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', '[]');
    }
  });

//전역 변수를 설정하여 함수 내부에서 액세스할 수 있도록 한다
let products = JSON.parse(localStorage.getItem('products'));
let cart = JSON.parse(localStorage.getItem('cart'));

//장바구니에 제품 추가
function addItemToCart(productId) {
  let product = products.find(function (product) {
    return product.id == productId;
  });

  if (cart.length == 0) {
    cart.push(product);
  } else {
    let res = cart.find((element) => element.id == productId);
    if (res === undefined) {
      cart.push(product);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}
addItemToCart(1);
addItemToCart(2);
addItemToCart(3);

//장바구니 제품 삭제
function removeItemFromCart(productId) {
  let temp = cart.filter((item) => item.id != productId);
  localStorage.setItem('cart', JSON.stringify(temp));
}
removeItemFromCart(3);

//제품 수량 업데이트
function updateQuantity(productId, quantity) {
  for (let product of cart) {
    if (product.id == productId) {
      product.quantity = quantity;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

updateQuantity(2, 8);

//장바구니 총액
function getTotal() {
  let temp = cart.map(function (item) {
    return parseFloat(item.price);
  });

  let sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);

  console.log(sum);
}
getTotal();

function loadProducts() {
  fetch('products.json')
    .then((response) => response.json())
    .then((products) => {
      let productList = document.getElementById('product-list');
      productList.innerHTML = '';

      for (let product of products) {
        let productItem = document.createElement('div');
        productItem.innerHTML = `
          <h2>${product.name}</h2>
          <p>가격: ${product.price}원</p>
          <button onclick="addToCart('${product.id}')">장바구니에 추가</button>
        `;
        productList.appendChild(productItem);
      }
    });
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[productId] = cart[productId] ? cart[productId] + 1 : 1;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  fetch('products.json')
    .then((response) => response.json())
    .then((products) => {
      for (let productId in cart) {
        let product = products.find((p) => p.id === productId);
        let productName = product.name;
        let productPrice = product.price;
        let quantity = cart[productId];
        let totalPrice = productPrice * quantity;

        let cartItem = document.createElement('li');
        cartItem.innerText = `${productName} x ${quantity} = ${totalPrice}원`;
        cartList.appendChild(cartItem);
      }
    });
}
*/
