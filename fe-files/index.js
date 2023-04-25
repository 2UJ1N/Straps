//index.html에 사용될 js 스크립트
import { getProducts } from './modules/fetchApi.mjs';

const products = await getProducts();

class ItemCard extends HTMLElement {
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
customElements.define('item-card', ItemCard);


// class CardGrid extends HTMLElement {
//   constructor() {
//     super();
//     const shadow = this.attachShadow({ mode: 'open' });

//     shadow.appendChild(htmlTemplate.content.cloneNode(true));
     
//   }

// }

// customElements.define('card-grid', CardGrid);


