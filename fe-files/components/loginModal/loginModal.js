import {loginUser,} from '../../modules/user.mjs';

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
        this._loginModalTemplate;
        this._url = 'http://34.64.218.104:3000/user/login';
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this._loginModalTemplate = `
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
                                <p id="noemail" style="color: red;"></p>
                            </div>
                            <div class="form-floating mb-3">
                                <input id="passwordInput" type="password" class="form-control">
                                <label for="floatingPassword text-center">비밀번호</label>
                                <p id="nopassword" style="color: red;"></p>
                            </div>
                            <!-- 버튼 -->
                            
                            <div class="button d-flex justify-content-center">
                                <button type="submit" class="login btn btn-lg btn-dark">Login</button>
                                <button type="button" class="signin btn btn-lg btn-outline-dark hover1" onclick="location.href='../../pages/joinForm/joinForm.html'">signin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
        this.insertAdjacentHTML("afterbegin", this._loginModalTemplate);

        const joinForm = document.querySelector('.signin');
        const login = document.querySelector(".login");

        login.addEventListener('click', async(event) => {
        event.preventDefault();
        const emessage = document.querySelector("#noemail");
        const pmessage = document.querySelector("#nopassword");
        emessage.innerText = "";
        pmessage.innerText = "";
        const emailInput = document.querySelector('#emailInput');
        const passwordInput = document.querySelector("#passwordInput");

        let userData = {};
        userData["email"] = emailInput.value;
        userData["password"] = passwordInput.value;
        const url = 'http://34.64.218.104:3000/user/login';
        const token = await loginUser(url,userData);
        console.log(token);
        if(token.message==='email'){
            
            emessage.innerText = "    이메일이 없습니다!";
        }else if(token.message==='password'){
            
            pmessage.innerText = "    비밀번호가 일치하지 않습니다!";
        }else if(token.message==='token'){
            window.localStorage.setItem("JWT",token.token);
            window.location.href = "../../index.html";
        }
        });

        joinForm.addEventListener("click", () => {
            window.location.href = "../../pages/joinForm/joinForm.html";
        });
    }
}
customElements.define('login-modal', LoginModal);