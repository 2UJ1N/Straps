const user = {
  "name": "육현진",
  "phones": "010-4659-5823",
  "postcode": "06265",
  "address" : "서울 강남구 강남대로 272",
  "more_address" : "101동 202호",
}

putUserData(user);

window.addEventListener('load', () => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
            event.preventDefault(); //기본동작 막고
            const userData = userDataCreate(form); //db에 들어갈 user정보를 만듬
            console.log(userData);
          //window.location.href = "../index.html"; //성공하면 홈으로 돌아가기
        }
        form.classList.add('was-validated');
      }, false);
    });
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

  //받은 데이터들 json객체로 만들기
function userDataCreate(form) {
    const userData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      if (input.id==="email"||input.id==="password"||input.id==="name"||input.id==="phones"||input.id==="postcode"||input.id==="address"||input.id==="more_address") {
          userData[input.id] = input.value;
      }
    });
    return JSON.stringify(userData);
}

function putUserData(userData){
  console.log(userData);
  // document.querySelector("#name").value = userData.name;
  // document.querySelector("#phones").value = userData.phones;
  // document.querySelector("#postcode").value = userData.postcode;
  // document.querySelector("#address").value = userData.address;
  // document.querySelector("#more_address").value =userData.more_address;
}

function resetData(){
  // document.querySelector("#name").value = "";
  // document.querySelector("#phones").value = "";
  // document.querySelector("#postcode").value = "";
  // document.querySelector("#address").value = "";
  // document.querySelector("#more_address").value ="";

}