import { getProducts } from '../../modules/product.mjs';

const productsUrl = "http://34.64.218.104:5002/products";
//////////////////////////////////////////
class ItemCard extends HTMLElement {
    constructor(productNumber = 1, name = "name", price = "500") {
        super();
        this.noShadow = true;
        this.productNumber = productNumber;
        this.name = name;
        this.price = price;
        this.cardTemplate = `
            <a href=${window.location.href}pages/productDetail/productDetails.html>
                <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg" src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
            </a>
                <p>
                    ${this.productNumber}
                    상품명 : ${this.name}
                </p>
            <p>
                가격 : ${this.price} 원

            </p
            <p>
                <button type="button" class="btn btn-secondary">
                    장바구니에 추가
                </button>
            </p>
        `;
    }
    async connectedCallback() {
        this.render();
    }
    render() {
        this.insertAdjacentHTML("afterbegin", this.cardTemplate);
    }
}
customElements.define('item-card', ItemCard);

////////////////////////////////////////////
//CardGridTest Component
class CardGridTest extends HTMLElement {
    constructor() {
        super();
        this.noShadow = true;
        this.cardGridTemplate = `    
            <slot id="categoryTabLabel">Category</slot>
            <div class="container">
                <h3>test111</h3>
            </div>
        `;
        this.jsonArray;
    }
    async connectedCallback() {
        this.jsonArray = await getProducts(productsUrl);
        this.render();
    }
    addItemsToGrid(jsonArray){
        const cardGrid = this.querySelector('div');
        let rowNum = 0;
        for (let i = 0; i < jsonArray.length; i++) {
            if (i >= 16) break;
            const { name, image, price } = jsonArray[i];
            const productNumber = Number(i + 1);
            let itemCard = new ItemCard(productNumber,name,price);
            let divCol = document.createElement('div');
            let divRow;
            divCol.setAttribute("class","col");
            divCol.setAttribute("id","product"+productNumber);
            divCol.insertAdjacentElement("beforeend",itemCard);
            if ((productNumber + 3) % 4 === 0) {
                rowNum++;
                divRow = document.createElement('div');
                divRow.setAttribute("class","row");
                divRow.setAttribute("id","row" + rowNum);
                divRow.insertAdjacentElement("beforeend",divCol);
                cardGrid.insertAdjacentElement("beforeend",divRow);
            }{
                divRow = document.querySelector("#row"+rowNum);
                divRow.insertAdjacentElement("beforeend",divCol);
            }
        }
    }
    render() {
        this.insertAdjacentHTML("afterbegin", this.cardGridTemplate);
        this.addItemsToGrid(this.jsonArray);
    }
}
customElements.define('card-grid-test', CardGridTest);
//////////////////////////////////////////