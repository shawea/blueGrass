
document.body.style.cursor = 'wait';

window.onload = function() {
    setTimeout(function(){
        console.log('L')
        head.js('http://scdn.primus.netdna-cdn.com/latest/TweenLite.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/signals.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/more/transparency.min.js'
            // app
            ,'aCDN/app/Srv.js'
            ,'aCDN/app/Acc.js'
    )//head
    },20)//wait on fonts
}

