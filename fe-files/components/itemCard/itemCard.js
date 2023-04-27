//////////////////////////////////////////
export default class ItemCard extends HTMLElement {
    constructor(productNumber = 1, name = "이름이매우1매우2매우3매우4매우4매우5매우6매우7매우8매우9매우10길어요", price = "500") {
        super();
        this._noShadow = true;
        this._productNumber = productNumber;
        this._name = name;
        this._price = price;
        this._cardTemplate = `
        <a href=${window.location.href}pages/productDetail/productDetail.html>
            <img alt="이미지1" data-original="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg" src="//image.msscdn.net/images/goods_img/20200820/1557508/1557508_4_125.jpg">
        </a>
        <div class="info row">
            <div class="productNum" hidden>
                ${this._productNumber}
            </div>
            <h5 class="productName">
                ${this._name}
            </h5>
            <div class="productPrice">
                ₩ ${this._price}
            </div>
        </div>
        <!-- 버튼 -->
        <div class="buttons">
            <button type="button" class="heart btn btn-lg btn-outline-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </button>
            <button type="button" class="addCart${this._productNumber} btn btn-lg btn-dark" id="addCart${this._productNumber}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
            
        </div>
        `;
    }
    get price(){
        return this._price;
    }
    get name(){
        return this._name;
    }
    get productNumber(){
        return this._productNumber;
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.insertAdjacentHTML("afterbegin", this._cardTemplate);
    }
}
customElements.define('item-card', ItemCard);