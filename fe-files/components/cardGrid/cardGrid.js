import { Button } from 'bootstrap';
import { getProducts } from '../../modules/product.mjs';
import ItemCard from '../itemCard/itemCard.js';

const productsUrl = "http://34.64.218.104:3000/products";
// const productsUrl = "http://34.64.218.104:5002/products";
////////////////////////////////////////////
//CardGrid Component
class CardGrid extends HTMLElement {
    constructor() {
        super();
        this._sort = 2;
        this._productsObj;
        this._productsArr;
        this._category = "best";
        this._cardGridTemplate = `    
            <slot id = "categoryTabLabel" >Category</slot>
            <div class="container">
                <h4>${this._category}</h4>
                <div class="dropdown text-end">
                <select id="sortSelector">
                    <option value="2">인기순</option>
                    <option value="1">높은 가격순</option>
                    <option value="0">낮은 가격순</option>
                </select>
              </div>
            </div>
        `;
    }
    set category(value) {
        this._category = value;
        let products = this.changeCategory(this._category,this._productsArr);
        this.update(products);
    }

    get category() {
        return this._category;
    }

    set sort(value) {
        this._sort = value;
        this.updateTemplate();
        this.update();
    }

    get sort() {
        return this._sort;
    }
    async connectedCallback() {
        this._productsObj = await getProducts(productsUrl);
        this._productsArr = this._productsObj.products;
        this.render();
    }
    changeCategory(category,products) {
        const filteredProducts = [];
        if(category === "galaxy"){
            products.forEach(element => {
                //galaxy
                if(element.kind === true){
                    filteredProducts.push(element)
                }
            });
        }
        if(category === "apple"){
            products.forEach(element => {
                //galaxy
                if(element.kind === false){
                    filteredProducts.push(element)
                }
            });
        }
        if(category === "best"){
            this._productsArr.forEach(element =>{
                filteredProducts.push(element);
            })
        }
        return filteredProducts;
    }
    addItemsToGrid(products,sort){
        //인기순
        if(sort === 2){

        }
        //낮은가격순
        if(sort === 0){
            products = products.sort((a, b) => {
                if (a.price < b.price) {
                  return -1;
                }
            });              
        }
        //높은가격순
        if(sort === 1){
            products = products.sort((a, b) => {
                if (a.price > b.price) {
                  return -1;
                }
            });              
        }
        const cardGrid = this.querySelector('div');
        let rowNum = 0;
        for (let i = 0; i < products.length; i++) {
            if (i >= 16) break;
            const { name, image, price } = products[i];
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
        this.insertAdjacentHTML("afterbegin", this._cardGridTemplate);
        // this.addItemsToGrid(this.obj,this.sort);
        this.addItemsToGrid(this._productsArr,this._sort);
    }
    changeSort(e){
        console.log(e.target.getAttribute("id"));
        
    }
    update(products){
        this.innerHTML = this._cardGridTemplate;
        this.addItemsToGrid(products,this.sort);
    }
}
customElements.define('card-grid', CardGrid);
//////////////////////////////////////////