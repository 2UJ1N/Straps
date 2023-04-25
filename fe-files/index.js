//index.html에 사용될 js 스크립트
import { putProduct, deleteProduct, postProduct ,getProducts } from './modules/product.mjs';
import { changeUser, deleteUser, getUser, putUser } from './modules/user.mjs';

//서버 주소
let productsUrl = "http://34.64.218.104:5002/products";

////////////////////
//getProducts DEMO
// const products = getProducts(productsUrl);
// console.log(products);
////////////////////

////////////////////////////////////////////////
// postProduct DEMO
let dataForPostDemo =   {
    "name": "PostDemo",
    "kind": 1,
    "price": 2522,
    "content": "testcontent13",
    "image": "http://dummyimage.com/183x100.png/dddddd/000000",
    "regdate": "6/9/2022",
    "prod_cell": 3
  };
const callPostProduct = postProduct(productsUrl,dataForPostDemo);
console.log(callPostProduct);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

let dataForPutDemo = {
  "name": "PutDemo",
  "kind": 1,
  "price": 962,
  "content": "test1010",
  "image": "http://naver.com/183x100.png/5fa2dd/ffffff",
  "regdate": "9/23/2025",
  "prod_count": 501,
  "prod_cell": 91,
  "prod_seq": 10
};

let putUrlParams = 10;

const callPutProduct = putProduct(productsUrl, putUrlParams ,dataForPutDemo);
console.log(callPutProduct);
////////////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

let deleteUrlParams = 2;

const callDeleteProduct = deleteProduct(productsUrl, deleteUrlParams);
console.log(callDeleteProduct);
////////////////////////////


/////////////상품 카드 데모///////////////////
class ItemCardDemo extends HTMLElement {
  constructor() {
    super();
    //shadow DOM 생성
    const shadow = this.attachShadow({ mode: 'open' });
    //템플릿을 붙임
    const cardTemplate = document.createElement("template");
    cardTemplate.innerHTML = `
    <div>
      <div>
        <div>
          <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg"
            src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
        </div>
        <p>
          name111
        </p>
        <p>
          123213
        </p
      </div>
    </div>
    `;
    shadow.appendChild(cardTemplate.content.cloneNode(true));
  }
}
customElements.define('item-card-demo', ItemCardDemo);

//////////////////////////////////////////////
// 상품 카드 클래스
class ItemCard extends HTMLElement {
  constructor() {
    super();
    const { image, name, price} = products[0];

    //shadow DOM 생성
    const shadow = this.attachShadow({ mode: 'open' });

    //템플릿 생성
    const cardTemplate = document.createElement("template");

    //html 정의
    cardTemplate.innerHTML = `
    <li>
      <div>
        <div>
          <div>
            <slot name="item-image"></slot>
            <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg"
              src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
          </div>
          <p>
            <slot name="item-name"></slot>
          </p>
          <p>
            <slot name="item-price"></slot>
          </p
        </div>
      </div>
    </li>
    `;

    //완성된 cardTemplate append
    shadow.appendChild(cardTemplate.content.cloneNode(true));
  }
}
customElements.define('item-card', ItemCard);


////////////////////////////////////////////
//상품 그리드

class CardGrid extends HTMLElement {
  constructor() {
    super();
    //field 정의

    //additem 함수 정의
    this.addItem = this.addItem.bind(this);
    //fetchProducts 함수 정의
    this.fetchProducts = this.fetchProducts.bind(this);
    //fetch한 상품 정보 등록 함수 정의
    this.itmesInit = this.itmesInit.bind(this);

    //shadow DOM 생성
    const shadow = this.attachShadow({ mode: 'open' });
    //템플릿 생성
    const cardContainer = document.createElement('template');
    //html 정의
    cardContainer.innerHTML = `
      <style>
      </style>
      <button>&oplus;</button>
      <ul>
      </ul>
    `
    //완성된 cardTemplate append
    shadow.appendChild(cardContainer.content.cloneNode(true));
  }

  //컴포넌트가 DOM에 연결 되면 실행되는 함수
  async connectedCallback() {
    // 버튼 선택
    const addButton = this.shadowRoot.querySelector('button');

    //ul 선택
    this.itemList = this.shadowRoot.querySelector('ul');

    await this.fetchProducts()
    //fetchProducts 실행
    await this.itmesInit();

    //addButton에 클릭 이벤트 추가
    addButton.addEventListener('click', this.addItem, false);
  }

  //상품추가 함수
  addItem(e) {
    {
      const card = document.createElement('item-card-demo');
      this.itemList.appendChild(card);
    }
  }
  //상품 정보 fetch 함수
  async fetchProducts() {
    return await getProducts(productsUrl);
  }
  //불러온 상품 정보 출력
  async itmesInit(){

    //TODO 작동이 안되요ㅠㅠ
    // const json = await this.fetchProducts();
    // let name = json[0].name;
    // let price = json[0].price;
    // let image = json[0].image;
    // let card = document.createElement('item-card');
    // card.querySelector('slot');
    // console.log(card);

    // this.itemList.appendChild(card);
  }
}
customElements.define('card-grid', CardGrid);



//서버 주소
let userUrl = "http://34.64.218.104:5002/user";

////////////////////////////////////////////////
// postProduct DEMO
let userDataForPostDemo = {
    "password": "s58rBMief",
    "name": "Molly Stubbings",
    "address": "Ulsan",
    "phones": "010-6742-6856",
    "email": "mstubbings0@google.com",
    "regdate": "12/24/2022",
    "role": false,
    "status": false
  };

const callPutUser = putUser(userUrl,userDataForPostDemo);
console.log(callPutUser);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

let userDataForChangeDemo = {
  "password": "aaaabbbb!!11",
  "name": "Molly Stubbings",
  "address": "Ulsan",
  "phones": "010-6742-1234",
  "email": "mstubbings0@google.com",
  "regdate": "12/24/2022",
  "role": false,
  "status": false
};


const callChangeUser= changeUser(userUrl, userDataForChangeDemo["email"] ,userDataForChangeDemo);
console.log(callChangeUser);
////////////////////////////

////////////////////
//getProducts DEMO
const callGetUser = getUser(userUrl, userDataForChangeDemo["email"]);
console.log(callGetUser);
////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO


let deleteUserEmail = userDataForChangeDemo["email"];

const callDeleteUser= deleteUser(userUrl, deleteUserEmail);
console.log(callDeleteUser);
////////////////////////////