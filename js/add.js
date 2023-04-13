const elAddProductForm = document.querySelector(".add-form");
const elNewProductName = document.querySelector(".product_desc");

let newElement = {}
elAddProductForm.addEventListener("submit", () => {

  newElement.name = elNewProductName.value;
  products.push(newElement);
  console.log(products);
})

products.slice(0, 2);
console.log(products);