
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
      CloneTemplate.querySelector('.popular__item__div__span').dataset.id = product.id;
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
  const btnId = evt.target.dataset.id;
  console.log(evt.target.matches(".popular__item__div__span"));
  if(evt.target.matches(".popular__item__img")){
    elModalproducts.style.display = "flex";
    const foundProduct = products.find((item) => item.id.toString() === btnId);

      ProductModalInfo(foundProduct);
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



// -----------------------------------------------------


const elTodoForm = document.querySelector(".js-todo-form")
const elTodoInput = document.querySelector(".js-todo-input")
const elTodoList = document.querySelector(".js-todo-list")

const API_PATH = "https://backend-ecommerce-mr7n.onrender.com/"
const token = localStorage.getItem("loginToken")

async function getTodos(){
    try {
        const res = await fetch(API_PATH + "todo", {
            method: "GET",
            headers: {
                Authorization: token
            }

        });
        const data = await res.json();
        renderTodos(data)
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

async function setTodo(id){
    if(id >= 0){
        try {
            const res = await fetch(API_PATH + "todo/" + id, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    text: elTodoInput.value,
                })
            })
        } catch (error) {
            console.log(error.message)
        }

        id = "";
    } else {
    try {
        const res = await fetch(API_PATH + "todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body : JSON.stringify({
                text: elTodoInput.value,
            })
        })
        const data = await res.json()
        getTodos()
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}
}


// elTodoForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     setTodo()
// })

async function checkTodo(id) {
    try {
        const res = await fetch(API_PATH + "todo/edit/" + id, {
            method: 'PUT',
            headers: {
                Authorization: token
            }
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}




// function renderTodos(data){
//     elTodoList.innerHTML = null;
//     data.forEach((todo) => {
//         // const newLi = document.createElement('li');
//         // const input = document.createElement('input');
//         // const button = document.createElement('button');
//         // newLi.setAttribute("class", "list-group-item")
//         // newLi.classList.add("d-flex")
//         // input.setAttribute("type", "checkbox");
//         // input.setAttribute("class", "form-check");
//         // button.textContent = "😎"
//         // input.dataset.todoId = todo.id;
//         // button.dataset.editId = todo.id;
//         // newLi.textContent = `${todo.id}: ${todo.todo_value}`;
//         // newLi.appendChild(input);
//         // newLi.appendChild(button);

//         // input.addEventListener("input", function(evt) {
//         //     const todoId = evt.target.dataset.todoId;
//         //     checkTodo(todoId);
//         //     console.log(evt.target.dataset)
//         //     // newLi.classList.toggle("line")
//         //     if(todo.completed){
//         //         newLi.classList.add("line")
//         //     } else {
//         //         newLi.classList.remove("line")
//         //     }
//         // })

//         // button.addEventListener("click", function(evt){
//         //     const editId = evt.target.dataset.editId;
//         //     setTodo(editId);
//         // })

//         // elTodoList.appendChild(newLi);
//     })
// }

// getTodos()










// if (document.readyState == 'loading'){
//   document.addEventListener('DOMContentLoaded', ready);
// }else{
//   ready();
// }
// function ready () {
//   let removeCardBnts = document.querySelector(".card-remove");
//   console.log(removeCardBnts);
//   for(let i = 0; i < removeCardBnts.length; i++) {
//       let button = removeCardBnts[i];
//       button.addEventListener("click", removeCardItem);
//   }

//   let addCard = document.querySelector(".popular__item__div__span");
//   for(let i = 0; i < addCard.length; i++){
//       let addCardBtn = addCard[i]
//       addCardBtn.addEventListener("click", addCardClicked);
//   }
// }


// function addCardClicked(evt) {
//   let addCardBtn = evt.target
//   let shopProducts = addCardBtn.parentElement
//   let title = shopProducts.querySelector(".sail__desc")[0].innerHTML
//   console.log(title);

// }


// function removeCardItem(evt){
//     let buttonClicked = evt.target
//     buttonClicked.parentElement.remove();
// }



let choosedProducts = [];
if(JSON.parse(localStorage.getItem('korzinka'))===null){
  localStorage.setItem('korzinka',JSON.stringify(choosedProducts));
}else{
  choosedProducts = JSON.parse(localStorage.getItem('korzinka'));
}

const btn = document.querySelectorAll('.popular__item__div__span');
btn.forEach((item, index) => {
    item.addEventListener('click', (evt)=>{
      const btnId = evt.target.dataset.id;
      const newArr = products.filter((n)=> (n.id === products[index].id));
      choosedProducts = [...choosedProducts,...newArr];
      console.log(choosedProducts.length);
      localStorage.setItem('korzinka', JSON.stringify(choosedProducts));
    })
});

