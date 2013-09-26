// loader code ///////////////////////////////
document.body.style.cursor = 'wait';
require([
    '//scdn.primus.netdna-cdn.com/latest/jquery-2.1.b1.js',
    '//scdn.primus.netdna-cdn.com/latest/fastclick.js',
    '//scdn.primus.netdna-cdn.com/latest/TweenLite.min.js',
    '//scdn.primus.netdna-cdn.com/latest/blueGrass.js'
], function () {
    require([
        ,
        '//scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js',
        '//scdn.primus.netdna-cdn.com/latest/more/parallax.js'
    ], function () {
        console.log('loaded v0.2');
        FastClick.attach(document.body);

        document.body.style.cursor = 'default';
    });
});

// nav code ////////////////////////////////////
var hamBut = document.getElementById('hamburger');
hamBut.addEventListener('click', function () {
    toggleSideNav();
});
var navFlag;
function toggleSideNav() {
    console.log('slider');
    if (!navFlag) {
        TweenLite.to('#slider', .2, { x: 408 });
        TweenLite.to('#kontainer', .2, { x: 400 });
    } else {
        TweenLite.to('#slider', .2, { x: 0 });
        TweenLite.to('#kontainer', .2, { x: 0 });
    }
    navFlag = !navFlag;
}

var aboutBut = document.getElementById('about');
aboutBut.addEventListener('click', function () {
    loadAbout();
});
function loadAbout() {
    console.log('about');
}
//# sourceMappingURL=main.js.map
