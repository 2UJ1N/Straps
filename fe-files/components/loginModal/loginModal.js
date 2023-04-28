import {loginUser,} from '../../modules/user.mjs';
import {getProduct,} from '../../modules/product.mjs';

//모달 포커스 하는 코드
// const modalSignin = document.getElementById('modalSignin');
// const emailInput = document.getElementById('emailInput');
// const passwordInput = document.getElementById('passwordInput');

// modalSignin.addEventListener('shown.bs.modal', () => {
//     emailInput.focus()
// })

export default class LoginModal extends HTMLDivElement  {
    constructor() {
      super();
    //   템플릿 생성
      this.innerHTML = `   
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
}





const joinForm = document.querySelector('.signin');
const login = document.querySelector(".login");

login.addEventListener('click', async(event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#emailInput');
  const passwordInput = document.querySelector("#passwordInput");

  let userData = {};
  userData["email"] = emailInput.value;
  userData["password"] = passwordInput.value;
  const url = 'http://34.64.218.104:3000/user/login';
  const token = await loginUser(url,userData);
  console.log(token);
  if(token.message==='email'){
    const message = document.querySelector("#noemail");
    message.innerText = "    이메일이 없습니다!";
  }else if(token.message==='password'){
    const message = document.querySelector("#nopassword");
    message.innerText = "    비밀번호가 일치하지 않습니다!";
  }else if(token.message==='token'){
    window.localStorage.setItem("JWT",token.token);
    window.location.href = "../../index.html";
  }
});

joinForm.addEventListener("click", () => {
  window.location.href = "../index.html";
});
