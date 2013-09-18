
document.body.style.cursor = 'wait';

if('__proto__' in {}) {
    //jq or z
    document.write('<script src="http://scdn.primus.netdna-cdn.com/latestO/zepto.min.js"><\/script>')
    console.log('z')
}   else {
    document.write('<script src="http://scdn.primus.netdna-cdn.com/latestO/more/jquery-2.0.3.min.js"><\/script>')
    console.log('jq')
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DL')
    setTimeout(function(){
        head.js('http://scdn.primus.netdna-cdn.com/latestO/TweenLite.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latestO/signals.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latestO/blueGrass.js'
            ,'http://scdn.primus.netdna-cdn.com/latestO/CSSPlugin.min.js'
            // app
            ,'pCDN/app/Pre.js'
            ,'pCDN/app/App.js'
        )//head
    },10)//wait on fonts
})


