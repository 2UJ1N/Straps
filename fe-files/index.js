//index.html에 사용될 js 스크립트
async function getProducts() {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const products = getProducts();
  console.log(products);