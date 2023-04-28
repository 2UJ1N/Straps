import {putUser,} from '../../modules/user.mjs';

const registerUser = async (url, userData) => {
  await putUser(url, userData);
};

window.addEventListener('load', () => {
  const forms = document.getElementsByClassName('needs-validation');
  const addressBtn = document.querySelector('#search');

  // submit 전 모든 값 입력하기
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', async(event) => {
      if (form.checkValidity() === false) { //값이 없으면
        event.preventDefault(); //동작멈추게 하고 was-validated추가
        event.stopPropagation();
      } else {
        event.preventDefault(); //기본동작 막고
        const userData = userDataCreate(form); //db에 들어갈 user정보를 만듬
        const url = 'http://34.64.218.104:3000/user/register';
        registerUser(url, userData); // 이 부분에서 await 사용     
        window.location.href = "../../index.html"; //성공하면 홈으로 돌아가기
      }
      form.classList.add('was-validated');
    }, false);
  });
  
  createBrithOptions();//생년월일 날짜 달기

  //비밀번호 유효성 검사
  document.getElementById('password').onkeyup=function(event){
    var pw = this.value;
    var num = pw.search(/[0-9]/g); //숫자부분
    var eng = pw.search(/[a-z]/ig); //영어부분

    if(pw.length < 8 || pw.length > 20){
      document.getElementById('pwchk01').innerHTML = '비밀번호는 8자리에서 20자리 사이로 입력해주세요';
      event.preventDefault();
      event.stopPropagation();
    } else if(pw.search(/\s/) != -1){
      document.getElementById('pwchk01').innerHTML = '비밀번호는 공백없이 입력해주세요';
      event.preventDefault();
      event.stopPropagation();
    } else if(num < 0 || eng < 0){
      document.getElementById('pwchk01').innerHTML = '비밀번호는 영문(소문자), 숫자를 혼합하여 입력해주세요';
      event.preventDefault();
      event.stopPropagation();
    } else{
      document.getElementById('pwchk01').innerHTML = '';
    }
  }

  //비밀번호 일치 확인
  document.getElementById('passwordCheck').onkeyup = function(event){
    var pww = document.getElementById('password').value; //비밀번호값
    var pwck = this.value; //비밀번호 확인값

    if(pww != pwck){ //다르면
      document.getElementById('pwchk02').innerHTML = '비밀번호가 일치하지 않습니다';
      event.preventDefault();
      event.stopPropagation();
    } else{ //같으면
      document.getElementById('pwchk02').innerHTML = '';
    }
  }
  addressBtn.addEventListener('click', ()=>{
    findAddr();
  })
}, false);


//주소 불러오기 - daum api 활용
function findAddr(){
  new daum.Postcode({ 
    oncomplete: function(data) {
      var addr = '';
      var roadAddr = data.roadAddress; //도로명주소 변수
      var jibunAddr = data.jibunAddress; //지번주소 변수

      document.getElementById("postcode").value = data.zonecode;

      if(roadAddr !== ''){
        document.getElementById("address").value = roadAddr;
      }
      else if(jibunAddr !== ''){
        document.getElementById("address").value = jibunAddr;
      }

      //커서를 상세주소필드로 이동
      document.getElementById("more_address").focus();
    }
  }).open();
}

// 생년월일 날짜 달기
function createBrithOptions(){
  const selectYear = document.querySelector("#year");
  const selectMonth = document.querySelector("#month");
  const selectDay = document.querySelector("#day");
  var now = new Date();
  var year = now.getFullYear();
  //년도추가
  function createYearOptions() {
    for (let i = 1900; i <= year; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = i + "년";
      selectYear.add(option);
    }
  }

  // 월 추가
  function createMonthOptions() {
    for (let i = 1; i <= 12; i++) {
      // 1~9월까지는 앞에 0을 추가해줍니다.
      let month = i < 10 ? "0" + i : i;
      let option = document.createElement("option");
      option.value = month;
      option.text = i + "월";
      selectMonth.add(option);
    }
  }

  //일추가
  function createDayOptions() {
    for (let i = 1; i <= 31; i++) {
      // 1~9일까지는 앞에 0을 추가해줍니다.
      let day = i < 10 ? "0" + i : i;
      let option = document.createElement("option");
      option.value = day;
      option.text = i + "일";
      selectDay.add(option);
    }
  }
createYearOptions();
createMonthOptions();
createDayOptions();
}

//받은 데이터들 json객체로 만들기
function userDataCreate(form) {
  const userData = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  userData["user_id"] = "99";
  inputs.forEach((input) => {
    if (input.id==="email"||input.id==="password"||input.id==="name"||input.id==="phones"||input.id==="address") {
        userData[input.id] = input.value;
    }
  });
  
  return userData;
}