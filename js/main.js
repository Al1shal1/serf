const burger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')

const links = document.querySelectorAll('.overlay .menu__title'); [1,2,3,4,5,6,7]

links.forEach(function (e){
    e.addEventListener('click', switchMenu );
});

function switchMenu(e){
    e.preventDefault();
    burger.classList.toggle('hamburger--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('body--active');
}
burger.addEventListener('click', switchMenu);