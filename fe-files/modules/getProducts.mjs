async function getProducts() {
    try {
      const response = await fetch("http://localhost:3000/products", {
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
  }
export { getProducts };