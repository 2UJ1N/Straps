import { getProducts } from '../../modules/product.mjs';
import ItemCard from '../itemCard/itemCard.js';

const productsUrl = "http://34.64.218.104:5002/products";
////////////////////////////////////////////
//CardGrid Component
class CardGrid extends HTMLElement {
    constructor() {
        super();
        this._category = "best";
        this.cardGridTemplate = `    
            <slot id = "categoryTabLabel" >Category</slot>
            <div class="container">
                <h4>${this._category}</h4>
            </div>
        `;
        this.jsonArray;
        this.categoryNameTest;
    }
    set category(value) {
        this._category = value;
        this.updateTemplate();
        this.update();
    }

    get category() {
        return this._category;
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
            }else{
                divRow = document.querySelector("#row"+rowNum);
                divRow.insertAdjacentElement("beforeend",divCol);
            }
        }
    }
    render() {
        this.insertAdjacentHTML("afterbegin", this.cardGridTemplate);
        this.addItemsToGrid(this.jsonArray);
    }
    updateTemplate(){
        this.cardGridTemplate = `    
        <slot id = "categoryTabLabel" >Category</slot>
        <div class="container">
            <h4>${this._category}</h4>
        </div>
        `;
    }
    update(){
        this.innerHTML = this.cardGridTemplate;
        this.addItemsToGrid(this.jsonArray);
    }
}
customElements.define('card-grid', CardGrid);
//////////////////////////////////////////