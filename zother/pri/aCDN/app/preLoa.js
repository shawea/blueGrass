document.body.style.cursor = 'wait';

if ('__proto__' in {}) {
    //jq or z
    document.write('<script src="http://scdn.primus.netdna-cdn.com/latest/zepto.min.js"><\/script>');
    console.log('z');
} else {
    document.write('<script src="http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js"><\/script>');
    console.log('jq');
}

window.onload = function () {
    console.log('L');
    setTimeout(function () {
        head.js('http://scdn.primus.netdna-cdn.com/latest/TweenLite.min.js', 'http://scdn.primus.netdna-cdn.com/latest/signals.min.js', 'http://scdn.primus.netdna-cdn.com/latest/fastclick.js', 'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js', 'http://scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js', 'aCDN/app/PriApp.js');
    }, 20);
};
//@ sourceMappingURL=preLoa.js.map
