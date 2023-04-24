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
  }
export { getProducts };