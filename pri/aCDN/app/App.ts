console.log('0')


var menuBtn = document.querySelector('.topcoat-icon--menu-stack');
menuBtn.addEventListener('click', showSidemenu, false);
function showSidemenu () {
    console.log('side')
    var container = document.querySelector('#container');
    container.classList.toggle('opened');
    var slider = document.querySelector('#slider');
    slider.classList.toggle('opened');
}
