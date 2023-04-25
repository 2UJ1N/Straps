//모달 포커스 하는 코드
const modalSignin = document.getElementById('modalSignin');
const emailInput = document.getElementById('emailInput');
// const passwordInput = document.getElementById('passwordInput');

modalSignin.addEventListener('shown.bs.modal', () => {
    emailInput.focus()
})