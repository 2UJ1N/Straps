
////////////////////////////////////////////
//CardGridTest Component
class CardGridTest extends HTMLElement {
  constructor() {
    super();
    //템플릿 생성
    const cardTemplate = document.createElement('template');
    this.innerHTML = `    
    <slot id="categoryTabLabel">hello1</slot>
    <div class="container">
        <h3>test111</h3>
    </div>
    `
  }
  //컴포넌트가 DOM에 연결 되면 실행되는 함수
  connectedCallback() {

  }
}
customElements.define('card-grid-test', CardGridTest);

