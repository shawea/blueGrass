

document.body.style.cursor = 'wait';

window.onload = function() {
    setTimeout(function(){
        console.log('L')
        head.js('http://scdn.primus.netdna-latest.com/latest/TweenLite.min.js'
            ,'http://scdn.primus.netdna-latest.com/latest/more/transparency.min.js'
            ,'http://scdn.primus.netdna-latest.com/latest/signals.min.js'
            ,'http://scdn.primus.netdna-latest.com/latest/fastclick.js'
            ,'http://scdn.primus.netdna-latest.com/latest/more/moment.min.js'
            ,'http://scdn.primus.netdna-latest.com/latest/blueGrass.js'
            ,'http://scdn.primus.netdna-latest.com/latest/cloudAPI.js'
            ,'http://scdn.primus.netdna-latest.com/latest/more/jquery-2.0.3.min.js' //zepto or jq ?
            ,'http://scdn.primus.netdna-latest.com/latest/CSSPlugin.min.js'
            // app
            ,'aCDN/app/Pres.js'
            ,'aCDN/app/App.js'
        )//head
    },10)//wait on fonts
}



