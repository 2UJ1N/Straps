
    // submit 전 모든 값 입력하기
    window.addEventListener('load', () => {
      const forms = document.getElementsByClassName('needs-validation');

      Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    }, false);

    //비밀번호 유효성 검사
    document.getElementById('password').onkeyup=function(){
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
    document.getElementById('passwordCheck').onkeyup=function(){
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

    //selectbox 생년월일 생성
    $(document).ready(function(){
        var now = new Date();
        var year = now.getFullYear();
        var mon = (now.getMonth() + 1) > 9 ? ''+(now.getMonth() + 1) : '0'+(now.getMonth() + 1); 
        var day = (now.getDate()) > 9 ? ''+(now.getDate()) : '0'+(now.getDate());       

        //년도 selectbox만들기               
        for(var i = 1900 ; i <= year ; i++) {
            $('#year').append('<option value="' + i + '">' + i + '년</option>');    
        }

        // 월별 selectbox 만들기            
        for(var i=1; i <= 12; i++) {
            var mm = i > 9 ? i : "0"+i ;            
            $('#month').append('<option value="' + mm + '">' + mm + '월</option>');    
        }
        
        // 일별 selectbox 만들기
        for(var i=1; i <= 31; i++) {
            var dd = i > 9 ? i : "0"+i ;            
            $('#day').append('<option value="' + dd + '">' + dd+ '일</option>');    
        }

        if($('#year > option').val() == '') {

        }

        // $("#year  > option[value="+year+"]").attr("selected", "true");        
        // $("#month  > option[value="+mon+"]").attr("selected", "true");    
        // $("#day  > option[value="+day+"]").attr("selected", "true");       
      
    });