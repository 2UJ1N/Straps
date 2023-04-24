async function postProduct(data) {
    try {
      const response = await fetch("http://localhost:3000/products", {
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
export { postProduct };