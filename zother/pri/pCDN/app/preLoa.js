document.body.style.cursor = 'wait';

if ('__proto__' in {}) {
    //jq or z
    document.write('<script src="/latest/zepto.min.js"><\/script>');
    console.log('z');
} else {
    document.write('<script src="/latest/more/jquery-2.0.3.min.js"><\/script>');
    console.log('jq');
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DL');
    setTimeout(function () {
        head.js('/latest/TweenLite.min.js', '/latest/signals.min.js', '/latest/fastclick.js', '/latest/blueGrass.js', '/latest/CSSPlugin.min.js', 'pCDN/app/Pre.js', 'pCDN/app/App.js');
    }, 10);
});
//# sourceMappingURL=preLoa.js.map
