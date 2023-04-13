const likedArr = JSON.parse(localStorage.getItem('korzinka'));
const cardFragment = new DocumentFragment();
console.log(likedArr);
likedArr.forEach((n)=>{
    const elCard = document.querySelector('#korzinkaCard').content;
    const CloneCard = elCard.cloneNode(true);
        CloneCard.querySelector('.sail__img').src= n.img;
        CloneCard.querySelector('.sail__desc').textContent= n.name;
        CloneCard.querySelector('.sail__price').textContent= `${n.new_sum} сум`;
        cardFragment.appendChild(CloneCard);
})

document.querySelector('.sail-list').appendChild(cardFragment);
