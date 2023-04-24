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
export { putProduct };