//////////////////////////////////////////
export default class ItemCard extends HTMLElement {
    constructor(productNumber = 1, name = "이름이매우1매우2매우3매우4매우4매우5매우6매우7매우8매우9매우10길어요", price = "500") {
        super();
        this.noShadow = true;
        this.productNumber = productNumber;
        this.name = name;
        this.price = price;
        this.cardTemplate = `
            <a href=${window.location.href}pages/productDetail/productDetails.html>
                <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg" src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
            </a>
                <p>상품 번호 : ${this.productNumber}</p>
                <p>
                    상품명 : ${this.name}
                </p>
            <p>
                가격 : ${this.price} 원

            </p
            <p>
                <button id = "cardButton${this.productNumber}" type="button" class="btn btn-secondary">
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