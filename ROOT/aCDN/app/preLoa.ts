
document.body.style.cursor = 'wait';

document.write('<script src="http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js"><\/script>')

window.onload = function() {
    setTimeout(function(){
        console.log('L')
        head.js(
             'http://scdn.primus.netdna-cdn.com/latest/TweenLite.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/more/transparency.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/more/signals.min.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/fastclick.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/more/moment.min.js'
            ,'/latest/blueGrass.js'
            ,'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js'

            ,'http://scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js'
            // app
            ,'aCDN/app/Pres.js'
            ,'aCDN/app/App.js'
        )//head
    },10)//wait on fonts
}



