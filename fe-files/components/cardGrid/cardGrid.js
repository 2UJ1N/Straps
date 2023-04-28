import { getSortedProducts } from '../../modules/product.mjs';
import ItemCard from '../itemCard/itemCard.js';

const productsUrl = "http://34.64.218.104:3000/products";
////////////////////////////////////////////
//CardGrid Component
class CardGrid extends HTMLElement {
    constructor() {
        super();
        this._sortParam = "00";
        // this._sortValue = 0;
        this._productsObj;
        this._productsArr;
        this._category = "best";
        this._cardGridTemplate;
    }
    set category(value) {
        this._category = value;
        let sortParm = "";
        if(this._category === "best"){
            sortParm += "0";
        }
        if(this._category === "sale"){
            sortParm += "1";
        }
        if(this._category === "galaxy"){
            sortParm += "2";
        }
        if(this._category === "apple"){
            sortParm += "3";
        }
        this._sortParam = (sortParm += "0");
        this.update();
    }

    get category() {
        return this._category;
    }

    set sortParam(value) {
        this._sortParam = value;
        this.update();
    }

    get sortParam() {
        return this._sortParam;
    }
    async connectedCallback() {
        this._productsObj = await getSortedProducts(productsUrl,this._sortParam);
        this._productsArr = this._productsObj.products;
        this.render();
    }

    render() {
        this._cardGridTemplate = `
            <div class="container">   
                <div class="row">
                    <slot id = "categoryTabLabel" class="col-md-5">Category</slot>
                    <div class="container" class="col-md-5">
                        <h4>${this._category}</h4>
                        <div class="dropdown text-end">
                            <select id="sortSelector">
                                <option value="0">인기순</option>
                                <option value="1">높은 가격순</option>
                                <option value="2">낮은 가격순</option>
                            </select>
                        </div>
                    </div>
                </div>
            <div>
        `;
        this.innerHTML = this._cardGridTemplate;
        this.addItemsToGrid(this._productsArr);
        this.querySelector('#sortSelector').addEventListener("input",(e)=>{
            let sortParam = "";
            if(this._category === "best"){
                sortParam += "0";
            }
            if(this._category === "sale"){
                sortParam += "1";
            }
            if(this._category === "galaxy"){
                sortParam += "2";
            }
            if(this._category === "apple"){
                sortParam += "3";
            }
            if(e.target.value === "0"){
                sortParam += "0";
                //인기순 
            }
            if(e.target.value === "1"){
                sortParam += "1";
                //높은 가격순  
            }
            if(e.target.value === "2"){
                sortParam += "2";
                //낮은 가격순
            }
            console.log(e.target.value);
            this.sortParam = sortParam;
        })
    }

    async update(){
        this._productsObj = await getSortedProducts(productsUrl,this._sortParam);
        this._productsArr = this._productsObj.products;
        this.render();
    }

    addItemsToGrid(products){
        const cardGrid = this.querySelector('div');
        let rowNum = 0;
        for (let i = 0; i < products.length; i++) {
            if (i >= 16) break;
            const { name, image, price, prod_num } = products[i];
            const colNumber = Number(i + 1);
            let itemCard = new ItemCard(this._category,prod_num,name,price,image);
            let divCol = document.createElement('div');
            let divRow;
            divCol.setAttribute("class","col");
            divCol.setAttribute("id","col"+colNumber);
            divCol.insertAdjacentElement("beforeend",itemCard);
            if ((colNumber + 3) % 4 === 0) {
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
}
customElements.define('card-grid', CardGrid);
//////////////////////////////////////////