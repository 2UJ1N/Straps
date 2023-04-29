import LoginModal from '../loginModal/loginModal.js';
// 로그인 모달 import
const loginModal = new LoginModal();

////////////////////////////////////////////
//CustomHeader Component
export default class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this._customHeaderTemplate;
    this._category;
  }
  set category(value) {
    //아이템 카드 클릭시 설정됨
    this._category = value;
  }

  get category() {
      return this._category;
  }

  //컴포넌트가 DOM에 연결 되면 실행되는 함수
  connectedCallback() {
    this.render();
  }
  render() {
    this._customHeaderTemplate = `
      <header class="shopHeader py-3">
      <div class="row">
          <div class="link col-4 pt-1">
              <a class="eliceLink" href="https://elice.io/">
                  <img class="eliceLogo" src="../../images/eliceLogo.png"/>
              </a>
          </div>
          <div class="logo col-4 text-center">
              <a class="shopLogo text-dark" href=${window.location.origin}>Straps</a>
          </div>

          <div class="chk col-4 d-flex justify-content-end align-items-center">
              <svg id="loginButton" type="button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-person-circle justify-content-end" viewBox="0 0 16 16"                 data-bs-toggle="modal" href="#modalSignin">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              <svg id="cartButton" type="button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-cart-fill justify-content-end" viewBox="0 0 16 16" data-bs-toggle="offcanvas" data-bs-target="#cartSideBar">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
          </div>
      </div>
      <div class="categoryBar d-flex flex-grow-1 justify-content-center">
          <ul class="nav">
            <li class="nav-item" id="bestTab">
              <button id="bestTabButton" class="categoryBtn btn btn-outline-dark active" type="button">Best</button>
            </li>
              <span class="divider2 align-self-center">·</span>
            <li class="nav-item" id="saleTab">
              <button id="saleTabButton" class="categoryBtn btn btn-outline-dark" type="button">Sale</button>
            </li>
              <span class="divider1 align-self-center">|</span>
            <li class="nav-item" id="galaxyTab">
              <button id="galaxyTabButton" class="categoryBtn btn btn-outline-dark" type="button">갤럭시</button>
            </li>
              <span class="divider2 align-self-center">·</span>
            <li class="nav-item" id="appleTab">
              <button id="appleTabButton" class="categoryBtn btn btn-outline-dark" type="button">애플</button>
            </li>
          </ul>
        </div>
    </header>    
    `;
    this.innerHTML = this._customHeaderTemplate;
    this.querySelectorAll(".nav-item")
      .forEach((elem) => {
        elem.addEventListener('click', this.changeAcitveTab, false);
    });
    this.appendChild(loginModal);
  }
  update(){
    this.render();
  }

  changeAcitveTab(e) {
    {
      const classString = e.target.getAttribute("class")
        .replace('active','').trimEnd();

      const navPills = this.parentNode;
      navPills.querySelectorAll(".nav-item")
        .forEach((elem) => {
          elem.firstElementChild.setAttribute("class", classString);
        });
      e.target.setAttribute("class", classString + " " + "active");
      try{
        let cardGrid = document.querySelector("card-grid");
        cardGrid.category = e.target.getAttribute("id").replace('TabButton', '');
      }catch(error){
        console.log(error);
        window.location.href = window.location.origin;
      }
    }
  }
}
customElements.define('custom-header', CustomHeader);
