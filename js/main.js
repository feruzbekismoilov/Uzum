
var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  
  const elProductsList = document.querySelector(".popular__list");
  const elProductsTemplate = document.querySelector(".product-template").content;
  const ProductsFragment = new DocumentFragment();
  function renderProducts(_products) {
    elProductsList.innerHTML = null;
    _products.forEach(product =>{
      let CloneTemplate = elProductsTemplate.cloneNode(true);
      CloneTemplate.querySelector(".popular__item__img").src = product.img;
      CloneTemplate.querySelector(".popular__item__desc").textContent = product.name;
      CloneTemplate.querySelector(".popular__item__monthly-payment").textContent = `${product.oylik_sum}  сум/мес`;
      CloneTemplate.querySelector(".popular__item__old-price").textContent = `${product.old_sum} сум`;
      CloneTemplate.querySelector(".popular__item__new-price").textContent = `${product.new_sum} сум`;
   
     ProductsFragment.appendChild(CloneTemplate);
   })
   
   elProductsList.appendChild(ProductsFragment);
  }
  renderProducts(products);


const elSearchForm = document.querySelector(".header__middle__form");
const elSearchInput = elSearchForm.querySelector(".header__middle__form__input");

elSearchForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  const inputValue = elSearchInput.value.trim();
  const SearchQuery = new RegExp(inputValue, "gi");
  const searchProduct = showSearchResult(SearchQuery);

  if(searchProduct.length>0){
    renderProducts(searchProduct);
  }else{
    elProductsList.innerHTML = `<div class = "text-white display-3" >Not found product!</div>`
  }

})


function showSearchResult (regexp){
  const filteredProducts = products.filter((product) => 
  String(product.name).match(regexp) 
  );
  return filteredProducts;
}