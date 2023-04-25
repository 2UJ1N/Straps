//index.html에 사용될 js 스크립트
import { putProduct, deleteProduct, postProduct ,getProducts } from './modules/product.mjs';

//서버 주소
let url = "http://34.64.218.104:5002/products";

////////////////////
//getProducts DEMO
const products = await getProducts(url);
console.log(products);
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
const callPostProduct = await postProduct(url,dataForPostDemo);
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

const callPutProduct = await putProduct(url, putUrlParams ,dataForPutDemo);
console.log(callPutProduct);
////////////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO

let deleteUrlParams = 2;

const callDeleteProduct = await deleteProduct(url, deleteUrlParams);
console.log(callDeleteProduct);
////////////////////////////


/////////////상품 카드 데모///////////////////
class ItemCardDemo extends HTMLElement {
  constructor() {
    const { image, name, price} = products[0]
    super();
    //shadow DOM 생성
    const shadow = this.attachShadow({ mode: 'open' });
    //템플릿을 붙임
    const cardTemplate = document.createElement("template");
    cardTemplate.innerHTML = `
    <div>
      <div>
        <div>
          ${image}
          <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg"
            src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
        </div>
        <p>
          ${name}
        </p>
        <p>
          ${price}
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

    //템플릿을 붙임
    const cardTemplate = document.createElement("template");

    cardTemplate.innerHTML = `
    <li>
      <div>
        <div>
          <div>
            ${image}
            <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg"
              src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
          </div>
          <p>
            ${name}
          </p>
          <p>
            ${price}
          </p
        </div>
      </div>
    </li>
    `;

    shadow.appendChild(cardTemplate.content.cloneNode(true));
  }
}
customElements.define('item-card', ItemCard);


////////////////////////////////////////////
//상품 그리드
class CardGrid extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const cardContainer = document.createElement('template');

    cardContainer.innerHTML = `
      <style>
      </style>
      <button>&oplus;</button>
      <ul>
      </ul>
    `

    this.addItem = this.addItem.bind(this);
    
    shadow.appendChild(cardContainer.content.cloneNode(true));
  }

  connectedCallback() {
    const addButton = this.shadowRoot.querySelector('button');

    this.itemList = this.shadowRoot.querySelector('ul');

    addButton.addEventListener('click', this.addItem, false);
    const card = document.createElement('item-card');
    this.itemList.appendChild(card);
  }

  //상품추가 함수
  addItem(e) {
    {
      const card = document.createElement('item-card');
      this.itemList.appendChild(card);
    }
  }
}
customElements.define('card-grid', CardGrid);


