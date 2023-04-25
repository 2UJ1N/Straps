//putProduct
//상품 정보 수정 API
async function putProduct(url = "", urlParmas = "" ,data = {}) {
    try{
        url = url + "/" + urlParmas;
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

//postProduct
//상품 정보 등록 API
async function postProduct(url,data) {
    try {
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


//getProducts
//상품 정보 가져오는 API
async function getProducts(url) {
    try {
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

//getProduct
//상품 정보 가져오는 API
async function getProduct(url = "", urlParmas = "") {
  try {
    url = url + "/" + urlParmas;
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

//deleteProduct
//상품 정보 삭제 API
async function deleteProduct(url = "", urlParmas = "") {
    try{
        url = url + "/" + urlParmas;
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
export { deleteProduct, putProduct, getProducts, postProduct , getProduct};
