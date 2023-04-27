//모달 포커스 하는 코드
// const modalSignin = document.getElementById('modalSignin');
// const emailInput = document.getElementById('emailInput');
// const passwordInput = document.getElementById('passwordInput');

// modalSignin.addEventListener('shown.bs.modal', () => {
//     emailInput.focus()
// })

export default class LoginModal extends HTMLElement  {
    constructor() {
      super();
    this.loginModalTemplate = `
    <div class="modal fade" id="modalSignin" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <!-- 모달 닫기 -->
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- 모달 본문 -->
                <div class="modal-body p-5 pt-0">
                    <!-- 인사 -->
                    <div class="ment text-center">
                        <span class="hi">Welcome</span>
                        <span class="shop">Straps!</span>
                    </div>

                    <form class="">
                        <!-- 아이디 비밀번호-->
                        <div class="form-floating mb-3">
                            <input id="emailInput" type="email" class="form-control">
                            <label for="floatingInput text-center">아이디</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input id="passwordInput" type="password" class="form-control">
                            <label for="floatingPassword text-center">비밀번호</label>
                        </div>
                        
                        <!-- 버튼 -->
                        <div class="button d-flex justify-content-center">
                            <button type="submit" class="login btn btn-lg btn-dark">Login</button>
                            <button type="button" class="signin btn btn-lg btn-outline-dark hover1">signin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    //   템플릿 생성
      this.loginModalTemplateBak = `   
        <div class="modal fade" id="modalSignin" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-4 shadow">
                    <div class="modal-header p-5 pb-4 border-bottom-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5 pt-0">
                        <form class="">
                            <div class="form-floating mb-3">
                                <input id="emailInput" type="email" class="form-control rounded-3" >
                                <label for="floatingInput">아이디를 입력해주세요</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input id="passwordInput" type="password" class="form-control rounded-3" >
                                <label for="floatingPassword">비밀번호를 입력해주세요</label>
                            </div>
                            <button class="w-100 mb-2 btn rounded-3 btn-primary" type="submit">로그인</button>
                            <button class="w-100 mb-2 btn rounded-3 btn-secondary" type="button">회원가입</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    async connectedCallback() {
        this.render();
    }
    render() {
        this.insertAdjacentHTML("afterbegin", this.loginModalTemplate);
    }
}
customElements.define('login-modal', LoginModal);

const joinForm = document.querySelector('#join');


// joinForm.addEventListener("click", () => {
//   window.location.href = "../joinForm/joinForm.html";
// });


//서버 주소
let userUrl = "http://localhost:3001/user";

////////////////////////////////////////////////
// postProduct DEMO
let userDataForPostDemo = {
    "password": "s58rBMief",
    "name": "Molly Stubbings",
    "address": "Ulsan",
    "phones": "010-6742-6856",
    "email": "mstubbings0@google.com",
    "regdate": "12/24/2022",
    "role": false,
    "status": false
  };

// const callPutUser = putUser(userUrl,userDataForPostDemo);
// console.log(callPutUser);
////////////////////////////

////////////////////////////////////////////////
//putProduct DEMO

let userDataForChangeDemo = {
  "password": "aaaabbbb!!11",
  "name": "Molly Stubbings",
  "address": "Ulsan",
  "phones": "010-6742-1234",
  "email": "mstubbings0@google.com",
  "regdate": "12/24/2022",
  "role": false,
  "status": false
};


// const callChangeUser= changeUser(userUrl, userDataForChangeDemo["email"] ,userDataForChangeDemo);
// console.log(callChangeUser);
////////////////////////////

////////////////////
//getProducts DEMO
// const callGetUser = getUser(userUrl, userDataForChangeDemo["email"]);
// console.log(callGetUser);
////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO


let deleteUserEmail = userDataForChangeDemo["email"];

// const callDeleteUser= deleteUser(userUrl, deleteUserEmail);
// console.log(callDeleteUser);
////////////////////////////