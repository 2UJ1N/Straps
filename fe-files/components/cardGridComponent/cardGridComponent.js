import { getProducts } from '../../modules/product.mjs';

const productsUrl = "http://34.64.218.104:5002/products";
////////////////////////////////////////////
//Card-Grid Component

class CardGrid extends HTMLElement {
  constructor() {
    super();
    //additem 함수 정의
    // this.addItem = this.addItem.bind(this);
    //상품 정보 등록 함수 정의
    this.itemsInit = this.itemsInit.bind(this);

    //shadow DOM 생성
    const shadowRoot = this.attachShadow({ mode: 'open' });
    //템플릿 생성
    const cardContainer = document.createElement('template');
    //html 정의
    cardContainer.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <slot id="categoryTabLabel"></slot>
        <div>
        </div>
      `
    //완성된 cardTemplate append
    shadowRoot.appendChild(cardContainer.content.cloneNode(true));
  }

  //컴포넌트가 DOM에 연결 되면 실행되는 함수
  async connectedCallback() {
    // 버튼 선택
    // const addButton = this.shadowRoot.querySelector('button');

    //div 선택
    this.itemContainer = this.shadowRoot.querySelector('div');
    this.itemContainer.className = "container";
    //fetchProducts 실행
    const json = await getProducts(productsUrl);
    this.itemsInit(json);

    //addButton에 클릭 이벤트 추가
    // addButton.addEventListener('click', this.addItem, false);
  }
  // attributeChangedCallback(name, oldValue, newValue){

  // }
  //상품추가 함수
  // addItem(e) {
  //   {
  //     const card = document.createElement('item-card-demo');
  //     this.itemContainer.appendChild(card);
  //   }
  // }
  //불러온 상품 정보 출력
  itemsInit(jsonArray) {
    let rowNum = 0;
    for (let i = 0; i < jsonArray.length; i++) {
      if (i >= 16) break;
      const { name, image, price } = jsonArray[i];
      const productNumber = Number(i + 1);
      let divRow;
      let divCol = document.createElement("div");
      divCol.className = "col";
      divCol.id = "product" + productNumber
      divCol.innerHTML = `
          <a href=${window.location.href}pages/productDetail/productDetails.html>
            <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg"
            src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
          </a>
          </div>
          <p>
            ${productNumber}
            상품명 : ${name}
          </p>
          <p>
            가격 : ${price} 원
          </p
        `;
      if ((productNumber + 3) % 4 === 0) {
        rowNum++;
        divRow = document.createElement("div");
        divRow.className = "row"
        divRow.id = "row" + rowNum;
        divRow.appendChild(divCol);
      } else {
        divRow = this.itemContainer.querySelector('#row' + rowNum);
        divRow.appendChild(divCol);
      }
      this.itemContainer.appendChild(divRow);
    }
  }
  
}
customElements.define('card-grid', CardGrid);