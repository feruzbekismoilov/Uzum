
var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // GET PRODUCTS --------------------------------------------
  const elProductsList = document.querySelector(".popular__list");
  const elProductsTemplate = document.querySelector(".product-template").content;
  const ProductsFragment = new DocumentFragment();
  function renderProducts(_products) {
    elProductsList.innerHTML = null;
    _products.forEach(product =>{
      let CloneTemplate = elProductsTemplate.cloneNode(true);
      CloneTemplate.querySelector(".popular__item__img").src = product.img;
      CloneTemplate.querySelector(".popular__item__img").dataset.id = product.id;
      CloneTemplate.querySelector(".popular__item__desc").textContent = product.name;
      CloneTemplate.querySelector(".popular__item__monthly-payment").textContent = `${product.oylik_sum}  сум/мес`;
      CloneTemplate.querySelector(".popular__item__old-price").textContent = `${product.old_sum} сум`;
      CloneTemplate.querySelector(".popular__item__new-price").textContent = `${product.new_sum} сум`;
   
     ProductsFragment.appendChild(CloneTemplate);
   })
   
   elProductsList.appendChild(ProductsFragment);
  }
  renderProducts(products);
// ---------------------------------------------------------------


// SEARCH------------------------------------------------------------
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

// --------------------------------------------------------
const elProductsImg = document.querySelectorAll(".popular__item__img");

elProductsList.addEventListener("click", (evt) =>{

  if(evt.target.matches(".popular__item__img")){
    elModalproducts.style.display = "flex";

  }
});
const elModalproducts = document.querySelector(".modal-products");
const elExitBtn = document.querySelector(".exit-btn");  
elExitBtn.addEventListener("click", () =>{
    document.querySelector(".modal-products").style.display = "none";
})
const elModalCard = document.querySelector(".modal__card");
elModalproducts.addEventListener("click", (evt) =>{
  if(evt.target == elModalproducts){
    elModalproducts.style.display = "none ";
  }
});
// ------------------------------------------------------------


// RENDER MODAL FUNCTION
const elModalImg = document.querySelector(".modal__card__start__img");
const elModalDescription = document.querySelector(".modal__card__end__desc");
const elModalPrice = document.querySelector(".modal__card__end__price");
function ProductModalInfo(product) {
  console.log();
  elModalImg.src = product.img;
  elModalDescription.textContent = product.name;
  elModalPrice.textContent = `${product.new_sum} сум `;
}


// FIND MODAL EVENTS
  elProductsList.addEventListener("click", function (evt) {
    const btnId = evt.target.dataset.id;
    if (evt.target.matches(".popular__item__img")) {
      const foundProduct = products.find((item) => item.id.toString() === btnId);
      console.log(foundProduct);
      ProductModalInfo(foundProduct);
    }
  });


// -------------------------------------------------------


let count = 0;

const elMinusBtn = document.querySelector(".minus-btn");
const elPlusBtn = document.querySelector(".plus-btn");

elMinusBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if(count > 0) {
    document.querySelector(".modal__card__end__div__number").textContent = `${count} - ta`
    count--;
  }
});

elPlusBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  count++;
  document.querySelector(".modal__card__end__div__number").textContent = `${count} - ta`
});