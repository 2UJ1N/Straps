//////////////////////////////////////////
export default class cartItem extends HTMLElement {
    constructor(name, desc, img, price) {
        super();
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.price = price;
        this.quantity = 1;
        this._cardTemplate;
    }
    async connectedCallback() {
        this.render();
    }
    render() {
        this._cardTemplate = `
        <img src="${value.img}"> 
        <div class="details">
            <h3>${value.name}</h3>
            <p>${value.desc}
            <span class="quantity">수량: ${value.quantity}</span>
                <span class="price">가격: ₩${price}</span>
            </p>
        </div>
        <div class="cancel"><i class="fas fa-window-close"></i></div>
        `;
        this.innerHTML("afterbegin", this._cardTemplate);
    }
    update(){

    }
}
customElements.define('cart-item', cartItem);
