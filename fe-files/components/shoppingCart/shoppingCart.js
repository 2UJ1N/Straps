// CartItem 클래스 정의


////////////////////////////////////////////
//ShoppingCart

// ShoppingCart 클래스 정의 (장바구니 관련 동작 처리)
export default class ShoppingCart extends HTMLElement {
    constructor(){
        super();
        this._localCartTemplate;
        // this._key = 'cartItems'
    }
    connectedCallback() {
        this.render();
        const cartIcon = document.querySelector('#cartButton');
        const wholeCartWindow = this.querySelector('.whole-cart-window');
        wholeCartWindow.inWindow = 0;

        // const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        // addToCartBtns.forEach((btn) => {
        //     btn.addEventListener('click', this.addItemFunction);
        // });

        cartIcon.addEventListener('mouseover', () => {
            if (wholeCartWindow.classList.contains('hide'))
                wholeCartWindow.classList.remove('hide');
        });

        cartIcon.addEventListener('mouseleave', () => {
            // if(wholeCartWindow.classList.contains('hide'))
            setTimeout(() => {
                if (wholeCartWindow.inWindow === 0) {
                    wholeCartWindow.classList.add('hide');
                }
            }, 500);
        });

        wholeCartWindow.addEventListener('mouseover', () => {
            wholeCartWindow.inWindow = 1;
        });
        
        wholeCartWindow.addEventListener('mouseleave', () => {
            wholeCartWindow.inWindow = 0;
            wholeCartWindow.classList.add('hide');
        });

    }
    render(){
        this._localCartTemplate =`         
        <!-- 장바구니 아이콘과 장바구니 창을 포함하는 div -->
        <div class="cart-box">
            <div class="cart-icon">
                <i class="fas fa-cart-arrow-down fa-2x"></i>
            </div>
            <div class="whole-cart-window hide"> -->
                <!--<h2>장바구니</h2> ★★굳이 이게 필요할까라는 생각이 문득 드는 6시 10분-->
                <div class="cart-wrapper">
                </div>
                <!-- 총 합계 금액을 보여줄 div -->
                <div class="subtotal">Subtotal: $0.00</div>
                <!-- 결제 버튼 -->
                div class="checkout" onclick="location.href='#';">CHECKOUT</div>
            </div>
        </div>`;
        // update();
    }
    // // 로컬 장바구니의 상품들을 가져옴
    // getLocalCartItems() {
    //     let cartMap = new Map();
    //     const cart = localStorage.getItem(LocalCart.key);
    //     if (cart === null || cart.length === 0) return cartMap;
    //     return new Map(Object.entries(JSON.parse(cart)));
    // }
    // // 로컬 장바구니에 상품 추가
    // addItemToLocalCart(id, item) {
    //     let cart = LocalCart.getLocalCartItems();
    //     if (cart.has(id)) {
    //         let mapItem = cart.get(id);
    //         mapItem.quantity += 1;
    //         cart.set(id, mapItem);
    //     } else cart.set(id, item);
    //     localStorage.setItem(
    //         LocalCart.key,
    //         JSON.stringify(Object.fromEntries(cart))
    //     );
    //     update();
    // }
    // // 로컬 장바구니에서 상품 삭제
    // removeItemFromCart(id) {
    //     let cart = LocalCart.getLocalCartItems();
    //     if (cart.has(id)) {
    //         let mapItem = cart.get(id);
    //         if (mapItem.quantity > 1) {
    //             mapItem.quantity -= 1;
    //             cart.set(id, mapItem);
    //         } else cart.delete(id);
    //     }
    //     if (cart.length === 0) localStorage.clear();
    //     else
    //         localStorage.setItem(
    //             LocalCart.key,
    //             JSON.stringify(Object.fromEntries(cart))
    //         );
    //     update();
    // }
    // addItemFunction(e) {
    //     const id =
    //         e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    //     const img = e.target.parentElement.parentElement.previousElementSibling.src;
    //     const name = e.target.parentElement.previousElementSibling.textContent;
    //     const desc = e.target.parentElement.children[0].textContent;
    //     let price = e.target.parentElement.children[0].textContent;
    //     price = price.replace('₩', '');
    //     const item = new CartItem(name, desc, img, price);
    //     LocalCart.addItemToLocalCart(id, item);
    //     console.log(price);
    // }
    // update() {
    //     const cartWrapper = document.querySelector('.cart-wrapper');
    //     cartWrapper.innerHTML = '';
    //     const items = LocalCart.getLocalCartItems();
    //     console.log(items);
    
    //     if (items === null) return;
    //     let count = 0;
    //     let total = 0;
    //     for (const [key, value] of items.entries()) {
    //         const cartItem = document.createElement('div');
    
    //         cartItem.classList.add('cart-item');
    //         console.log(value.price);
    //         console.log(value.quantity);
    
    //         console.log(typeof value.price);
    //         console.log(typeof value.quantity);
    
    //         let price = value.price * value.quantity;
    //         price = Math.round(price * 100) / 100;
    //         count += 1;
    //         total += price;
    //         total = Math.round(total * 100) / 100;
    //         cartItem.innerHTML = `
    //         <img src="${value.img}"> 
    //                        <div class="details">
    //                            <h3>${value.name}</h3>
    //                            <p>${value.desc}
    //                             <span class="quantity">수량: ${value.quantity}</span>
    //                                <span class="price">가격: ₩${price}</span>
    //                            </p>
    //                        </div>
    //                        <div class="cancel"><i class="fas fa-window-close"></i></div>
    //         `;
    //         // 장바구니에서 상품 삭제 이벤트 추가
    //         cartItem.lastElementChild.addEventListener('click', () => {
    //             LocalCart.removeItemFromCart(key);
    //         });
    //         cartWrapper.append(cartItem);
    //     }
    
    //     // 장바구니에 상품이 있을 경우 UI 업데이트
    //     if (count > 0) {
    //         cartIcon.classList.add('non-empty');
    //         let root = document.querySelector(':root');
    //         root.style.setProperty('--after-content', `"${count}"`);
    //         const subtotal = document.querySelector('.subtotal');
    //         subtotal.innerHTML = `총 가격: ₩${total}`;
    //     } else cartIcon.classList.remove('non-empty');
    // }
}
customElements.define('shopping-cart', ShoppingCart);