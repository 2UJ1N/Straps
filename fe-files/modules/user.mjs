//User
//회원정보 수정 API
async function changeUser(url = "", urlId = "" ,data = {}) {
    try{
        url = url + "/" + urlId;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        const result =  await response.json();
        console.log("Success");
        return result;
    }
    catch{
        console.error("Error");
        return error;
    }
  }
// export { putProduct };

//putUser
//회원정보 등록 API
async function putUser(url,data) {
    try {
        url = url + "/" + data.email;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success");
      return result;
    } catch (error) {
      console.error("Error");
      return error;
    }
  }
// export { postProduct };


//getUser
//회원 정보 가져오는 API
async function getUser(url, urlId) {
    try {
        url = url + "/" + urlId;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
        const result = await response.json();
        console.log("Success");
        return result;
    } catch (error) {
      console.error("Error");
      return error;
    }
  };
// export { getProducts };

//deleteUser
//회원 정보 삭제 API
async function deleteUser(url = "", urlId = "") {
    try{
        url = url + "/" + urlId;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const result =  await response.json();
        console.log("Success");
        return result;
    }
    catch{
        console.error("Error");
        return error;
    }
  };
export { changeUser, deleteUser, getUser, putUser };