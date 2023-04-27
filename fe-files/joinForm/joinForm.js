window.addEventListener('load', () => {
  const forms = document.getElementsByClassName('needs-validation');
  
  // submit 전 모든 값 입력하기
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const userData = userDataCreate(form);
        console.log(userData); // 입력된 값들이 객체로 출력됨
        //window.location.href = "../index.html";
      }
      form.classList.add('was-validated');
    }, false);
  });
  createBrithOptions();//생년월일 날짜 달기
  //비밀번호 유효성 검사
  document.getElementById('password').onkeyup=function(event){
    var pw = this.value;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);

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
    var pww = document.getElementById('password').value;
    var pwck = this.value;

    if(pww != pwck){
      document.getElementById('pwchk02').innerHTML = '비밀번호가 일치하지 않습니다';
      event.preventDefault();
      event.stopPropagation();
    } else{ 
      document.getElementById('pwchk02').innerHTML = '';
    }
  }
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


function userDataCreate(form) {
  const userData = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  userData["birth"] = "";
  inputs.forEach((input) => {
    if (input.id==="email"||input.id==="password"||input.id==="name"||input.id==="phones"||input.id==="postcode"||input.id==="address"||input.id==="more_address") {
        userData[input.id] = input.value;
    }else if(input.id==="year"){
      userData["birth"] = input.value;
    }else if(input.id==="month"||input.id==="day"){
      userData["birth"] = userData.birth +"/"+ input.value;
    }
  });
  return JSON.stringify(userData);
}