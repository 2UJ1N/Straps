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
customElements.define('login-modal', LoginModal, {extends: 'div'});