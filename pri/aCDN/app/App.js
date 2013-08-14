viewDir = '../aCDN/view/';
console.log('1');

var navFlag = false;
var navBtn = document.querySelector('.topcoat-icon--menu-stack');
navBtn.addEventListener('click', toggleSideNav, false);

var nav = document.getElementById('slider');
nav.addEventListener('click', toggleSideNav, false);

function toggleSideNav() {
    console.log('side');
    if (!navFlag) {
        TweenLite.to('#slider', .2, { x: 405 });
    } else {
        TweenLite.to('#slider', .2, { x: 0 });
    }
    navFlag = !navFlag;
}

Rainbow.onHighlight(function (block) {
    console.log('was highlighted');
    TweenLite.from('#code1', .3, { autoAlpha: 0 });
    var split = new SplitText("#code1");
    TweenMax.staggerFrom(split.lines, .4, { y: -100, autoAlpha: 0, ease: Elastic.easeOut }, 0.1);
});

forward('why', 'why');
//@ sourceMappingURL=App.js.map
