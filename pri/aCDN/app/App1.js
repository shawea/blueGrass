viewDir = 'aCDN/view/';
console.log('0.01');
console.log(getBrowserInfo());

var menu = document.getElementById('navMenu');
menu.addEventListener('click', toggleSideNav, false);
var nav = document.getElementById('navBut');
nav.addEventListener('click', toggleSideNav, false);

var navFlag = false;
function toggleSideNav() {
    console.log('slider');
    if (!this.navFlag) {
        TweenLite.to('#slider', .2, { x: 405 });
        TweenLite.to('#kontainer', .2, { x: 405 });
    } else {
        TweenLite.to('#slider', .2, { x: 0 });
        TweenLite.to('#kontainer', .2, { x: 0 });
    }
    this.navFlag = !this.navFlag;
}

var aboutBut = document.getElementById('aboutBut');
aboutBut.addEventListener('click', about);
var tutBut = document.getElementById('tutBut');
tutBut.addEventListener('click', tut);

function tut() {
    forward('tut', 'tut', onTut);
}
function onTut() {
    console.log('loaded tut');
    cleanUpViews(1);
    setHash('tut');
}
function about() {
    forward('about', 'about', onAbout);
}
function onAbout() {
    console.log('loaded about');
    cleanUpViews(1);
    setHash('about');
}

loadFirst();
function loadFirst() {
    var view = getHash();
    if (view == null || view == 'about') {
        about();
        return;
    }
    tut();
}
//@ sourceMappingURL=App1.js.map
