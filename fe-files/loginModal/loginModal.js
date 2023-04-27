//모달 포커스 하는 코드
const modalSignin = document.getElementById('modalSignin');
const emailInput = document.getElementById('emailInput');
// const passwordInput = document.getElementById('passwordInput');
const joinForm = document.querySelector('#join');


joinForm.addEventListener("click", () => {
  window.location.href = "../joinForm/joinForm.html";
});

querySelector.addEventListener('click', ()=>{

})

modalSignin.addEventListener('shown.bs.modal', () => {
    emailInput.focus()
})






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

const callPutUser = putUser(userUrl,userDataForPostDemo);
console.log(callPutUser);
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


const callChangeUser= changeUser(userUrl, userDataForChangeDemo["email"] ,userDataForChangeDemo);
console.log(callChangeUser);
////////////////////////////

////////////////////
//getProducts DEMO
const callGetUser = getUser(userUrl, userDataForChangeDemo["email"]);
console.log(callGetUser);
////////////////////

////////////////////////////////////////////////
//deleteProduct DEMO


let deleteUserEmail = userDataForChangeDemo["email"];

const callDeleteUser= deleteUser(userUrl, deleteUserEmail);
console.log(callDeleteUser);
////////////////////////////